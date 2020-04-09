
from typing import List
from datetime import datetime

from PrintRecordRepository.IPrintRecordRepository import IPrintRecordRepository
from print import Print, PrintStatus


class DummyPrintRecordRepository(IPrintRecordRepository):
    _counter = 0

    def add_print(self,
                  user_id: str,
                  name: str,
                  contact_details: str,
                  file_download_link: str,
                  file_path: str) -> Print:
        self._counter += 1
        print = Print()
        print.id = str(self._counter)
        print.name = name
        print.contact_details = contact_details
        print.status = PrintStatus.IN_QUEUE
        print.timestamp = datetime.now().isoformat()

        return print

    def get_prints(self, user_id: str = None) -> List[Print]:
        raise Exception("NOT IMPLEMENTED")

    def get_print(self, print_id: str) -> Print:
        raise Exception("NOT IMPLEMENTED")

    def cancel_print(self, print_id: str) -> None:
        raise Exception("NOT IMPLEMENTED")
