import { db } from "../config/db.js";

export const getProducts = async (req, res) => {
  const result = await db.query("SELECT * FROM products");
  res.json(result.rows);
};

export const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;

  const result = await db.query(
    "INSERT INTO products (name, price, stock) VALUES ($1,$2,$3) RETURNING *",
    [name, price, stock]
  );

  res.json(result.rows[0]);
};