from fastapi import APIRouter, HTTPException
from .model import Products
from .database import products_collection

router = APIRouter()

@router.post("/products")
async def adding_a_product_in_the_stock_list(product: Products):

    for existing_product in products_collection.find():
        if existing_product["name"] == product.name and existing_product["brand"] == product.brand:
            updated_stock = existing_product["stock"] + product.stock
            products_collection.update_one(
                {"_id": existing_product["_id"]},
                {"$set": {"stock": updated_stock}}
            )
            return {
                "message": "Product already exists in stock list",
                "updated_stock": updated_stock
            }

    # Auto-increment ID starting from 1
    count = products_collection.count_documents({})
    new_id = count + 1

    new_product = {
        "id": new_id,           # ← auto ID added here
        "name": product.name,
        "category": product.category,
        "brand": product.brand,
        "price": product.price,
        "stock": product.stock,
        "rating": product.rating
    }
    result = products_collection.insert_one(new_product)
    new_product.pop("_id", None)

    return {
        "message": "Product is successfully added to the stock list",
        "product": new_product
    }


@router.get("/products")
async def fetching_all_products_details_from_stock_list():
    products = []
    for product in products_collection.find():
        product.pop("_id") 
        products.append(product)
    return {"products": products}


@router.get("/products/{product_id}")
async def fetching_a_product_details_from_stock_list(product_id: int):  # ← int now
    product = products_collection.find_one({"id": product_id})          # ← search by id
    if product:
        product.pop("_id")
        return {"product": product}
    else:
        raise HTTPException(status_code=404, detail="Product not found in the stock list")


@router.get("/products/category/{category_name}")
async def fetching_products_details_by_category_from_stock_list(category_name: str):
    products = []
    for product in products_collection.find({"category": category_name}):
        product.pop("_id")
        products.append(product)
    return {"products": products}
