from typing import List

from DomainObjects.printer import Printer


class IPrinterRecordRepository:
    def add_printer(self, printer_name: str, url: str, apiKey: str) -> Printer:
        raise NotImplementedError()

    def get_printers(self) -> List[Printer]:
        raise NotImplementedError()
