class Printer:
    id: int
    endpoint_address: str
    name: str
    apiKey: str

    def __init__(self, id: int, name: str, endpoint_address: str, apiKey: str) -> None:
        self.id = id
        self.endpoint_address = endpoint_address
        self.name = name
        self.apiKey = apiKey
