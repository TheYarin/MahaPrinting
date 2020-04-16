from typing import Dict


class DummyOctoRest:

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
