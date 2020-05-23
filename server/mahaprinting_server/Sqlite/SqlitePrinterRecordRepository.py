from threading import Lock

from typing import List, Optional
from sqlite3.dbapi2 import Connection, Row

from DomainObjects.Repositories.IPrinterRecordRepository import IPrinterRecordRepository
from DomainObjects.printer import Printer
from Sqlite.utils import synchronized


class SqlitePrinterRecordRepository(IPrinterRecordRepository):
    _connection: Connection
    _lock = Lock()

    def __init__(self, connection: Connection):
        self._connection = connection
        self._create_table()

    def _create_table(self) -> None:
        self._connection.execute(CREATE_TABLE_QUERY)

    # Public Methods

    @synchronized
    def add_printer(self, printer_name: str, url: str, apiKey: str) -> Printer:
        cursor = self._connection.execute(INSERT_QUERY, (printer_name, url, apiKey))
        self._connection.commit()

        printer = Printer(cursor.lastrowid, printer_name, url, apiKey)

        return printer

    def get_printers(self) -> List[Printer]:
        cursor = self._connection.execute(GET_ALL_PRINTERS_QUERY)
        rows = cursor.fetchall()
        printers = _convert_rows_to_printers(rows)

        return printers

    def get_printer(self, printer_id) -> Optional[Printer]:
        # Don't remove the trailing comma in (printer_id,) - The comma turns this expression into a tuple
        cursor = self._connection.execute(GET_PRINTER, (printer_id,))

        row = cursor.fetchone()

        if row is None:
            return None

        return _convert_row_to_printer(row)


def _convert_rows_to_printers(rows: List[Row]) -> List[Printer]:
    return [_convert_row_to_printer(row) for row in rows]


def _convert_row_to_printer(row: Row) -> Printer:
    return Printer(row[0], row[1], row[2], row[3])


CREATE_TABLE_QUERY = '''CREATE TABLE IF NOT EXISTS printers (
    id integer PRIMARY KEY,
    name text,
    url text,
    apiKey text
);'''

INSERT_QUERY = ''' INSERT INTO printers(name,url,apiKey)
                   VALUES(?,?,?) '''

GET_ALL_PRINTERS_QUERY = 'SELECT id,name,url,apiKey FROM printers'
GET_PRINTER = GET_ALL_PRINTERS_QUERY + ' WHERE id=? LIMIT 1'
