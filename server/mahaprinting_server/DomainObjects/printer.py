class Printer:
    id: int
    address: str
    name: str
    apiKey: str

    def __init__(self, id: int, name: str, address: str, apiKey: str) -> None:
        self.id = id
        self.address = address
        self.name = name
        self.apiKey = apiKey
