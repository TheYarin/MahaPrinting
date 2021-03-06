import os
from dotenv import load_dotenv

load_dotenv()


def get_env_var_yell_if_missing(key: str) -> str:
    value = os.getenv(key)

    if value is None:
        raise Exception('Missing environment variable: ' + key)

    return value


DB_PATH = get_env_var_yell_if_missing("SQLITE_DB_PATH")
ALLOW_CORS = get_env_var_yell_if_missing("ALLOW_CORS")
ADMIN_USER_ID = get_env_var_yell_if_missing("ADMIN_USER_ID")
UPLOADS_FOLDER = get_env_var_yell_if_missing("UPLOADS_FOLDER")
