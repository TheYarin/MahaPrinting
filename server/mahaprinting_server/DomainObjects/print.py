from enum import Enum


class PrintStatus(str, Enum):
    IN_QUEUE = "IN_QUEUE"
    PRINTING = "PRINTING"
    DONE = "DONE"
    CANCELED = "CANCELED"


class Print:
    id: int
    name: str
    status: PrintStatus
    userId: str
    contactDetails: str
    timestamp: str
    fileDownloadLink: str
    filePath: str  # On OctoPrint
    # file_location: str # On OctoPrint, "local" or "sdcard"


class UserPrint:
    def __init__(self, print: Print):
        self.id = print.id
        self.name = print.name
        self.status = print.status
        self.timestamp = print.timestamp
        self.contactDetails = print.contactDetails
