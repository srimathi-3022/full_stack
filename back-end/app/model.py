from pydantic  import BaseModel
from typing import Optional

class Products(BaseModel):
    id : Optional[int] = None
    name: str
    category: str
    brand: str
    price: int
    stock: int
    rating: int