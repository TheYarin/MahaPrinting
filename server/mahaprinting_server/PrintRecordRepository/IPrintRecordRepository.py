from typing import List

from print import Print


class IPrintRecordRepository:
    # On OctoPrint) -> Print:
    def add_print(self,
                  user_id: str,
                  name: str,
                  contact_details: str,
                  file_download_link: str,
                  file_path: str) -> Print:
        pass

    def get_prints(self, user_id: str = None) -> List[Print]:
        pass

    def get_print(self, print_id: str) -> Print:
        pass

    def cancel_print(self, print_id: str):
        pass
