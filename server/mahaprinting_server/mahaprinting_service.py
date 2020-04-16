from Dummies.DummyOctoRest import DummyOctoRest
from typing import Dict, List
import io
# import requests

from octorest import OctoRest

from DomainObjects.print import Print, PrintStatus, UserPrint
from DomainObjects.Repositories.IPrintRecordRepository import IPrintRecordRepository

from DomainObjects.Repositories.IPrinterRecordRepository import IPrinterRecordRepository
from DomainObjects.printer import Printer


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

    def add_printer(self, printer_name: str, address: str, apiKey: str) -> Dict:
        # TODO validate that the address and the API key are working
        printer = self.printer_record_repository.add_printer(printer_name, address, apiKey)

        return self._get_printer_info(printer)

    def get_printers_info(self) -> List[Dict]:
        printers_info = []
        printers = self.printer_record_repository.get_printers()

        for printer in printers:
            printers_info.append(self._get_printer_info(printer))

        return printers_info

    def _get_printer_info(self, printer: Printer) -> Dict:
        # client = OctoRest(printer.address, printer.apiKey)
        client = DummyOctoRest()
        printer_info = printer.__dict__.copy()
        printer_info['state'] = client.state()

        # if printer_info['flags']['printing'] is True:
        printer_info['jobInfo'] = client.job_info()

        return printer_info
