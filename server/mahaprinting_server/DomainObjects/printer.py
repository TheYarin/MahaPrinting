class Printer:
    id: int
    url: str
    name: str
    apiKey: str

    def __init__(self, id: int, name: str, url: str, apiKey: str) -> None:
        self.id = id
        self.url = url
        self.name = name
        self.apiKey = apiKey
