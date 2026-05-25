# Stockyard Product Inventory App

Stockyard is a full-stack product inventory app. The frontend is built with React and Vite, and the backend is built with FastAPI and MongoDB.

## Features

- View all inventory products
- Search products by ID, name, brand, or category
- Filter products by category
- Sort products by ID, stock, rating, or price
- View full product details
- Add a new product
- Update stock when the same product name and brand already exist

## Tech Stack

Frontend:

- React
- Vite
- React Router
- CSS

Backend:

- Python
- FastAPI
- Uvicorn
- MongoDB
- PyMongo

## Project Structure

```text
full-stack/
  back-end/
    app/
      main.py
      routes.py
      model.py
      database.py
    requirements.txt
  front-end/
    front-end-product/
      src/
      package.json
      vite.config.js
  README.md
```

## Backend Setup

Go to the backend folder:

```bash
cd back-end
```

Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside `back-end`:

```env
MONGO_URI=your_mongodb_connection_string
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

## Frontend Setup

Go to the frontend folder:

```bash
cd front-end/front-end-product
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside `front-end/front-end-product`:

```env
VITE_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

## API Routes

| Method | Route | Description |
| --- | --- | --- |
| POST | `/products` | Add a product or update stock |
| GET | `/products` | Get all products |
| GET | `/products/{product_id}` | Get product by ID |
| GET | `/products/category/{category_name}` | Get products by category |

## Example Product JSON

```json
{
  "name": "Laptop",
  "category": "Electronics",
  "brand": "HP",
  "price": 55000,
  "stock": 10,
  "rating": 4
}
```

## Notes

- Start the backend before using the frontend.
- Keep real database passwords and private connection strings out of GitHub.
- The frontend reads the backend URL from `VITE_API_URL`.
