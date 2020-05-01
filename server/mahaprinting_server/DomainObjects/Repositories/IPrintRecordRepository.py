from typing import List, Optional

from DomainObjects.print import Print, PrintStatus


class IPrintRecordRepository:
    # On OctoPrint) -> Print:
    def add_print(self,
                  user_id: str,
                  name: str,
                  contact_details: str,
                  file_download_link: str,
                  file_path: str) -> Print:
        raise Exception("NOT IMPLEMENTED")

    def get_prints(self, user_id: Optional[str] = None) -> List[Print]:
        raise Exception("NOT IMPLEMENTED")

    def get_print(self, print_id: int) -> Optional[Print]:
        raise Exception("NOT IMPLEMENTED")

    def change_print_status(self, print_id: int, new_status: PrintStatus) -> None:
        raise Exception("NOT IMPLEMENTED")
