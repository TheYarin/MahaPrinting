from typing import List, Optional

from print import Print


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

    def get_print(self, print_id: str) -> Print:
        raise Exception("NOT IMPLEMENTED")

    def cancel_print(self, print_id: str):
        raise Exception("NOT IMPLEMENTED")
