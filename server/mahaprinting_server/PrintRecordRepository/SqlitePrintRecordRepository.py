import sqlite3
from datetime import datetime
from threading import Lock

from typing import List, Optional
from sqlite3.dbapi2 import Connection


from settings import DB_PATH
from PrintRecordRepository.IPrintRecordRepository import IPrintRecordRepository
from print import Print, PrintStatus


def _synchronized(f):
    def newFunction(*args, **kw):
        self = args[0]
        self._lock.acquire()
        try:
            return f(*args, **kw)
        finally:
            self._lock.release()

    return newFunction


class SqlitePrintRecordRepository(IPrintRecordRepository):
    connection: Connection
    _lock = Lock()

    def __init__(self):
        self._connect_to_database()
        self._create_table()

    def _connect_to_database(self) -> None:
        self.connection = sqlite3.connect(DB_PATH, check_same_thread=False)

    def _create_table(self) -> None:
        self.connection.execute(CREATE_TABLE_QUERY)

    # Public Methods

    @_synchronized
    def add_print(self,
                  user_id: str,
                  name: str,
                  contact_details: str,
                  file_download_link: str,
                  file_path: str) -> Print:
        p = Print()
        p.userId = user_id
        p.name = name
        p.contactDetails = contact_details
        p.fileDownloadLink = file_download_link
        p.filePath = file_path
        p.status = PrintStatus.IN_QUEUE
        p.timestamp = datetime.now().isoformat()

        cursor = self.connection.execute(INSERT_QUERY,
                                         (p.timestamp,
                                          p.userId,
                                          p.name,
                                          p.status,
                                          p.contactDetails,
                                          p.fileDownloadLink,
                                          p.filePath))
        self.connection.commit()

        p.id = cursor.lastrowid

        return p

    def get_prints(self, user_id: Optional[str] = None) -> List[Print]:
        if user_id is None:
            cursor = self.connection.execute(GET_ALL_PRINTS_QUERY)
        else:
            # Don't remove the trailing comma in (user_id,) - It turns this expression into a tuple
            cursor = self.connection.execute(GET_USER_PRINTS_QUERY, (user_id,))

        rows = cursor.fetchall()

        prints = []

        for row in rows:
            p = Print()
            (p.id, p.timestamp, p.userId, p.name, p.status, p.contactDetails, p.fileDownloadLink, p.filePath) = row

            prints.append(p)

        return prints

    def get_print(self, print_id: str) -> Print:
        raise Exception("NOT IMPLEMENTED")

    def cancel_print(self, print_id: str):
        raise Exception("NOT IMPLEMENTED")


CREATE_TABLE_QUERY = '''CREATE TABLE IF NOT EXISTS prints (
    id integer PRIMARY KEY,
    timestamp text,
    userId text,
    name text,
    status text,
    contactDetails text,
    fileDownloadLink text,
    filePath text
);'''


INSERT_QUERY = ''' INSERT INTO prints(timestamp,userId,name,status,contactDetails,fileDownloadLink,filePath)
                   VALUES(?,?,?,?,?,?,?) '''

GET_USER_PRINTS_QUERY = 'SELECT id,timestamp,userId,name,status,contactDetails,fileDownloadLink,filePath FROM prints WHERE userId=?'
GET_ALL_PRINTS_QUERY = 'SELECT id,timestamp,userId,name,status,contactDetails,fileDownloadLink,filePath FROM prints'
