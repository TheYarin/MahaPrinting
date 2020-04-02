from enum import Enum


class PrintStatus(Enum):
    IN_QUEUE = "IN_QUEUE"
    PRINTING = "PRINTING"
    DONE = "DONE"


class Print:
    id: str
    name: str
    status: PrintStatus
    user_id: str
    contact_details: str
    timestamp: str
    file_download_link: str
    file_path: str  # On OctoPrint
    # file_location: str # On OctoPrint, "local" or "sdcard"


class UserPrint:
    def __init__(self, print: Print):
        self.id = print.id
        self.name = print.name
        self.status = print.status
        self.timestamp = print.timestamp
        self.contact_details = print.contact_details
