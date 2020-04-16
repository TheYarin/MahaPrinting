import sqlite3
from datetime import datetime
from threading import Lock

from typing import List, Optional
from sqlite3.dbapi2 import Connection, Row


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
            # Don't remove the trailing comma in (user_id,) - The comma turns this expression into a tuple
            cursor = self.connection.execute(GET_USER_PRINTS_QUERY, (user_id,))

        rows = cursor.fetchall()
        prints = _convert_rows_to_prints(rows)

        return prints

    def get_print(self, print_id: int) -> Optional[Print]:
        # Don't remove the trailing comma in (print_id,) - The comma turns this expression into a tuple
        cursor = self.connection.execute(GET_PRINT, (print_id,))

        row = cursor.fetchone()

        if row is None:
            return None

        return _convert_row_to_print(row)

    @_synchronized
    def change_print_status(self, print_id: int, new_status: PrintStatus) -> None:
        cursor = self.connection.execute(UPDATE_PRINT_STATUS, (new_status, print_id))
        self.connection.commit()

        if (cursor.rowcount != 1):
            raise Exception(
                "cursor.rowcount is not 1, which probably means the number of records changed is not 1, \
                    even though it should be. investigate why")


def _convert_rows_to_prints(rows: List[Row]) -> List[Print]:
    prints = []

    for row in rows:
        p = _convert_row_to_print(row)

        prints.append(p)

    return prints


def _convert_row_to_print(row: Row) -> Print:
    p = Print()
    (p.id, p.timestamp, p.userId, p.name, p.status, p.contactDetails, p.fileDownloadLink, p.filePath) = row

    return p


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

GET_ALL_PRINTS_QUERY = 'SELECT id,timestamp,userId,name,status,contactDetails,fileDownloadLink,filePath FROM prints'
GET_USER_PRINTS_QUERY = GET_ALL_PRINTS_QUERY + ' WHERE userId=?'
GET_PRINT = GET_ALL_PRINTS_QUERY + ' WHERE id=? LIMIT 1'
UPDATE_PRINT_STATUS = 'UPDATE prints SET status = ? WHERE id = ?'
