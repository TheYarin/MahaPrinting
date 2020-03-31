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
    file_path: str # On OctoPrint
    # file_location: str # On OctoPrint, "local" or "sdcard"