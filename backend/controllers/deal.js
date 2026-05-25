import { db } from "../config/db.js";

export const getDeals = async (req, res) => {
  const result = await db.query("SELECT * FROM deals");
  res.json(result.rows);
};

export const createDeal = async (req, res) => {
  const { customer_id, product_id, title, value } = req.body;

  const result = await db.query(
    "INSERT INTO deals (customer_id, product_id, title, value) VALUES ($1,$2,$3,$4) RETURNING *",
    [customer_id, product_id, title, value]
  );

  res.json(result.rows[0]);
};