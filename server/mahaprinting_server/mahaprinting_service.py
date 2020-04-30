from enum import Enum
from typing import Dict, List, Optional, Tuple
import io
# import requests

from DomainObjects.print import Print, PrintStatus, UserPrint
from DomainObjects.Repositories.IPrintRecordRepository import IPrintRecordRepository

from DomainObjects.Repositories.IPrinterRecordRepository import IPrinterRecordRepository
from DomainObjects.printer import Printer

from Dummies.DummyOctoRest import dummy_octorest_generator

from octorest import OctoRest, WorkflowAppKeyRequestResult


class AddPrinterResult(str, Enum):
    BAD_URL = "BAD_URL"
    WORKFLOW_UNSUPPORTED = "WORKFLOW_UNSUPPORTED"
    API_KEY_REQUEST_TIMED_OUT = "API_KEY_REQUEST_TIMED_OUT"
    API_KEY_REQUEST_DENIED = "API_KEY_REQUEST_DENIED"
    SUCCESS = "SUCCESS"


class AddPrinterWithApiKeyResult(str, Enum):
    BAD_API_KEY = "BAD_API_KEY"
    BAD_URL = "BAD_URL"
    SUCCESS = "SUCCESS"


class MahaPrintingService:
    print_record_repository: IPrintRecordRepository
    printer_record_repository: IPrinterRecordRepository

    def __init__(self,
                 print_record_repository: IPrintRecordRepository,
                 printer_record_repository: IPrinterRecordRepository):
        self.print_record_repository = print_record_repository
        self.printer_record_repository = printer_record_repository

    # PRINTS STUFF

    def upload_user_print(self, name: str, contact_details: str, user_id: str, file: io.IOBase) -> UserPrint:
        # TODO insert real file upload logic here
        # requests.post("http://localhost:5000/test", files=dict(boom=file))
        file_download_link = "<FILE DOWNLOAD LINK>"
        file_path = "<FILE PATH>"
        print = self.print_record_repository.add_print(user_id, name, contact_details, file_download_link, file_path)

        return UserPrint(print)

    def get_user_prints(self, user_id: str) -> List[UserPrint]:
        user_prints = self.print_record_repository.get_prints(user_id)

        return [UserPrint(p) for p in user_prints]

    def get_all_prints(self) -> List[Print]:
        return self.print_record_repository.get_prints()

    def does_print_belongs_to_user(self, print_id: int, user_id: str) -> bool:
        p = self.print_record_repository.get_print(print_id)

        return p.userId == user_id

    def cancel_print(self, print_id: int) -> None:
        self.print_record_repository.change_print_status(print_id, PrintStatus.CANCELED)

    # PRINTERS STUFF

    def add_printer(self, printer_name: str, url: str, user: Optional[str]) -> Tuple[AddPrinterResult, Optional[Dict]]:
        octorest_client = None

        try:
            octorest_client = OctoRest(url=url)
        except TypeError:
            return (AddPrinterResult.BAD_URL, None)

        (result, api_key) = (None, None)

        try:
            (result, api_key) = octorest_client.try_get_api_key('MahaPrinting', user)
        except ConnectionError:
            return (AddPrinterResult.BAD_URL, None)

        if result == WorkflowAppKeyRequestResult.WORKFLOW_UNSUPPORTED:
            return (AddPrinterResult.WORKFLOW_UNSUPPORTED, None)
        if result == WorkflowAppKeyRequestResult.TIMED_OUT:
            return (AddPrinterResult.API_KEY_REQUEST_TIMED_OUT, None)
        if result == WorkflowAppKeyRequestResult.NOPE:
            return (AddPrinterResult.API_KEY_REQUEST_DENIED, None)
        if result == WorkflowAppKeyRequestResult.GRANTED:
            printer_info = self._add_printer_no_url_validation(printer_name, url, api_key)

            return (AddPrinterResult.SUCCESS, printer_info)

        raise NotImplementedError("An unsupported WorkflowAppKeyRequestResult value was encountered: " + result.name)

    def add_printer_with_api_key(self, printer_name: str, url: str, api_key: str) -> Tuple[AddPrinterWithApiKeyResult,
                                                                                           Optional[Dict]]:

        if not api_key:
            return (AddPrinterWithApiKeyResult.BAD_API_KEY, None)

        # Validate that the url and the API key are working
        try:
            OctoRest(url=url, apikey=api_key)
        except Exception as e:
            if e is ConnectionError or "Provided URL is" in str(e):
                return (AddPrinterWithApiKeyResult.BAD_URL, None)
            elif "Forbidden (403)" in str(e):
                return (AddPrinterWithApiKeyResult.BAD_API_KEY, None)
            else:
                raise e

        printer_info = self._add_printer_no_url_validation(printer_name, url, api_key)

        return (AddPrinterWithApiKeyResult.SUCCESS, printer_info)

    def _add_printer_no_url_validation(self, printer_name: str, url: str, api_key: str) -> Dict:
        printer = self.printer_record_repository.add_printer(printer_name, url, api_key)

        return self._get_printer_info(printer)

    def get_printers_info(self) -> List[Dict]:
        printers_info = []
        printers = self.printer_record_repository.get_printers()

        for printer in printers:
            printers_info.append(self._get_printer_info(printer))

        return printers_info

    def _get_printer_info(self, printer: Printer) -> Dict:
        printer_info = printer.__dict__.copy()
        octorest_client = None

        try:
            octorest_client = OctoRest(url=printer.url, apikey=printer.apiKey)
        except (RuntimeError, ConnectionError):
            printer_info['state'] = "OctoPrint unavailable"
            return printer_info

        printer_info['state'] = octorest_client.state()

        # Get the printer model
        printer_profiles = octorest_client.printer_profiles()['profiles']
        # Assuming printer_profiles is not empty, and there's one profile marked as default
        default_profile = next(profile for profile in printer_profiles.values() if profile['default'] is True)
        printer_info['model'] = default_profile['model']

        printer_info['jobInfo'] = octorest_client.job_info()

        return printer_info
