from DomainObjects.print import Print
import os
from datetime import datetime
from pathlib import Path

from werkzeug.datastructures import FileStorage

TEMP_FILES_FOLDER_NAME = 'tmp'


class UploadsManager():
    _uploads_folder: str
    _temp_folder: str

    def __init__(self, uploads_folder: str) -> None:
        self._uploads_folder = uploads_folder
        Path(self._uploads_folder).mkdir(parents=True, exist_ok=True)
        self._temp_folder = os.path.join(self._uploads_folder, TEMP_FILES_FOLDER_NAME)
        Path(self._temp_folder).mkdir(parents=True, exist_ok=True)

    def upload_temp_file(self, file: FileStorage, extension: str) -> str:
        tmp_file_name = "tmp_" + datetime.now().replace(microsecond=0).isoformat().replace(':', '-') + "." + extension
        tmp_file_path = os.path.join(self._temp_folder, tmp_file_name)
        file.save(tmp_file_path)

        return tmp_file_path

    def save_temp_file_as_print(self, print: Print, tmp_file_path: str) -> None:
        final_file_path = self.get_print_file_path(print)
        os.rename(tmp_file_path, final_file_path)

    def get_print_file_path(self, print: Print) -> str:
        return os.path.join(self._uploads_folder, self.get_print_file_name(print))

    def get_print_file_name(self, print: Print) -> str:
        return 'mahaprinting_' + str(print.id) + '.' + print.fileExtension
