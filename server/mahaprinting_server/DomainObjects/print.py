from enum import Enum
from typing import Optional


class PrintStatus(str, Enum):
    IN_QUEUE = "IN_QUEUE"
    PRINTING = "PRINTING"
    COMPLETED = "COMPLETED"
    CANCELED = "CANCELED"


class Print:
    id: int
    name: str
    fileExtension: str
    slicedFor: Optional[str]
    status: PrintStatus
    userId: str
    contactDetails: str
    notes: str
    timestamp: str


class UserPrint:
    def __init__(self, print: Print):
        self.id = print.id
        self.name = print.name
        self.fileExtension = print.fileExtension
        self.slicedFor = print.slicedFor
        self.status = print.status
        self.contactDetails = print.contactDetails
        self.notes = print.notes
        self.timestamp = print.timestamp
