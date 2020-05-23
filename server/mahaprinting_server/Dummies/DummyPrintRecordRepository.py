
from typing import List, Optional
from datetime import datetime

from DomainObjects.Repositories.IPrintRecordRepository import IPrintRecordRepository
from DomainObjects.print import Print, PrintStatus


class DummyPrintRecordRepository(IPrintRecordRepository):
    _counter = 0

    def add_print(self,
                  user_id: str,
                  name: str,
                  file_extension: str,
                  sliced_for: Optional[str],
                  contact_details: str,
                  notes: str) -> Print:
        self._counter += 1
        print = Print()
        print.id = self._counter
        print.name = name
        print.fileExtension = file_extension
        print.slicedFor = sliced_for
        print.contactDetails = contact_details
        print.notes = notes
        print.status = PrintStatus.IN_QUEUE
        print.timestamp = datetime.now().isoformat()

        return print

    def get_prints(self, user_id: Optional[str] = None) -> List[Print]:
        raise NotImplementedError()

    def get_print(self, print_id: str) -> Print:
        raise NotImplementedError()

    def change_print_status(self, print_id: str, new_status: PrintStatus):
        raise NotImplementedError()
