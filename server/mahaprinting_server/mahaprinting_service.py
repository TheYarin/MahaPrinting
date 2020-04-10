from typing import List
import io

# import requests

from print import Print, UserPrint
from PrintRecordRepository.IPrintRecordRepository import IPrintRecordRepository
from PrintRecordRepository.SqlitePrintRecordRepository import SqlitePrintRecordRepository


class MahaPrintingService:
    print_record_repository: IPrintRecordRepository

    def __init__(self):
        self.print_record_repository = SqlitePrintRecordRepository()

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
