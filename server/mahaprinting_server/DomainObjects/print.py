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
    notes: str
    timestamp: str


class UserPrint:
    def __init__(self, print: Print):
        self.id = print.id
        self.name = print.name
        self.status = print.status
        self.contactDetails = print.contactDetails
        self.notes = print.notes
        self.timestamp = print.timestamp
