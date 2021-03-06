from datetime import datetime
from threading import Lock

from typing import List, Optional
from sqlite3.dbapi2 import Connection, Row

from DomainObjects.Repositories.IPrintRecordRepository import IPrintRecordRepository
from DomainObjects.print import Print, PrintStatus
from Sqlite.utils import synchronized


class SqlitePrintRecordRepository(IPrintRecordRepository):
    _connection: Connection
    _lock = Lock()

    def __init__(self, connection: Connection):
        self._connection = connection
        self._create_table()

    def _create_table(self) -> None:
        self._connection.execute(CREATE_TABLE_QUERY)

    # Public Methods

    @synchronized
    def add_print(self,
                  user_id: str,
                  name: str,
                  file_extension: str,
                  sliced_for: Optional[str],
                  contact_details: str,
                  notes: str) -> Print:
        p = Print()
        p.userId = user_id
        p.name = name
        p.fileExtension = file_extension
        p.slicedFor = sliced_for
        p.contactDetails = contact_details
        p.notes = notes
        p.status = PrintStatus.IN_QUEUE
        p.timestamp = datetime.now().isoformat()

        cursor = self._connection.execute(INSERT_QUERY,
                                          (p.timestamp,
                                           p.userId,
                                           p.name,
                                           p.fileExtension,
                                           p.slicedFor,
                                           p.status,
                                           p.contactDetails,
                                           notes))
        self._connection.commit()

        p.id = cursor.lastrowid

        return p

    def get_prints(self, user_id: Optional[str] = None) -> List[Print]:
        if user_id is None:
            cursor = self._connection.execute(GET_ALL_PRINTS_QUERY)
        else:
            # Don't remove the trailing comma in (user_id,) - The comma turns this expression into a tuple
            cursor = self._connection.execute(GET_USER_PRINTS_QUERY, (user_id,))

        rows = cursor.fetchall()
        prints = _convert_rows_to_prints(rows)

        return prints

    def get_print(self, print_id: int) -> Optional[Print]:
        # Don't remove the trailing comma in (print_id,) - The comma turns this expression into a tuple
        cursor = self._connection.execute(GET_PRINT, (print_id,))

        row = cursor.fetchone()

        if row is None:
            return None

        return _convert_row_to_print(row)

    @synchronized
    def change_print_status(self, print_id: int, new_status: PrintStatus) -> None:
        cursor = self._connection.execute(UPDATE_PRINT_STATUS, (new_status, print_id))
        self._connection.commit()

        if (cursor.rowcount != 1):
            raise Exception(
                "cursor.rowcount is not 1, which probably means the number of records changed is not 1, \
                    even though it should be. investigate why")


def _convert_rows_to_prints(rows: List[Row]) -> List[Print]:
    return [_convert_row_to_print(row) for row in rows]


def _convert_row_to_print(row: Row) -> Print:
    p = Print()
    (p.id, p.timestamp, p.userId, p.name, p.fileExtension, p.slicedFor, p.status, p.contactDetails, p.notes) = row

    return p


CREATE_TABLE_QUERY = '''CREATE TABLE IF NOT EXISTS prints (
    id integer PRIMARY KEY,
    timestamp text,
    userId text,
    name text,
    fileExtension text,
    slicedFor text,
    status text,
    contactDetails text,
    notes text
);'''

INSERT_QUERY = ''' INSERT INTO prints(timestamp,userId,name,fileExtension,slicedFor,status,contactDetails,notes)
                   VALUES(?,?,?,?,?,?,?,?) '''

GET_ALL_PRINTS_QUERY = 'SELECT id,timestamp,userId,name,fileExtension,slicedFor,status,contactDetails,notes FROM prints'
GET_USER_PRINTS_QUERY = GET_ALL_PRINTS_QUERY + ' WHERE userId=?'
GET_PRINT = GET_ALL_PRINTS_QUERY + ' WHERE id=? LIMIT 1'
UPDATE_PRINT_STATUS = 'UPDATE prints SET status = ? WHERE id = ?'
