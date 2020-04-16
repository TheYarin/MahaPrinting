from typing import List

from DomainObjects.printer import Printer


class IPrinterRecordRepository:
    # On OctoPrint) -> Print:
    def add_printer(self,
                    address: str,
                    printer_name: str,
                    apiKey: str) -> Printer:
        raise Exception("NOT IMPLEMENTED")

    def get_printers(self) -> List[Printer]:
        raise Exception("NOT IMPLEMENTED")
