import { db } from "../config/db.js";

export const getCustomers = async (req, res) => {
  const result = await db.query("SELECT * FROM customers");
  res.json(result.rows);
};

export const createCustomer = async (req, res) => {
  const { name, email, phone } = req.body;

  const result = await db.query(
    "INSERT INTO customers (name, email, phone) VALUES ($1,$2,$3) RETURNING *",
    [name, email, phone]
  );

  res.json(result.rows[0]);
};