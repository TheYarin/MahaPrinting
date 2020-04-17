from typing import Callable, Dict, List


def rotate_values(values: List) -> Callable:
    index = -1

    def value_generator():
        nonlocal index
        index = (index + 1) % len(values)
        return values[index]

    return value_generator


class DummyOctoRestPrinting:

    def state(self) -> Dict[str, any]:
        return {
            "text": "Printing",
            "flags": {
                "operational": True,
                "paused": False,
                "printing": True,
                "cancelling": False,
                "pausing": False,
                "sdReady": True,
                "error": False,
                "ready": False,
                "closedOrError": False
            }
        }

    def job_info(self) -> Dict[str, any]:
        return {
            "job": {
                "file": {
                    "name": "whistle_v2.gcode",
                    "origin": "local",
                    "size": 1468987,
                    "date": 1378847754
                },
                "estimatedPrintTime": 8811,
                "filament": {
                    "length": 810,
                    "volume": 5.36
                }
            },
            "progress": {
                "completion": 0.2298468264184775,
                "filepos": 337942,
                "printTime": 276,
                "printTimeLeft": 912
            },
            "state": "Printing"
        }


class DummyOctoRestOperational:

    def state(self) -> Dict[str, any]:
        return {
            "text": "Operational",
            "flags": {
                "operational": True,
                "paused": False,
                "printing": False,
                "cancelling": False,
                "pausing": False,
                "sdReady": True,
                "error": False,
                "ready": True,
                "closedOrError": False
            }
        }

    def job_info(self) -> Dict[str, any]:
        return {}


generator = rotate_values([DummyOctoRestPrinting, DummyOctoRestOperational])


def dummy_octorest_generator():
    return generator()()
