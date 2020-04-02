from typing import List

from print import Print


class IPrintRepository:
    def add_print(self, file, file_name: str, user_id: str, contact_details: str) -> Print:
        pass

    def get_prints(self, user_id: str = None) -> List[Print]:
        pass

    def get_print(self, print_id: str) -> Print:
        pass

    def cancel_print(self, print_id: str):
        pass
