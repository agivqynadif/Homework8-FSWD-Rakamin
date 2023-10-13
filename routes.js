const express = require("express");
const pool = require("./query.js");
const router = express.Router();

router.get("/actors", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM actor");
    res.json(results.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/films", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM film ORDER BY film_id ASC");
    res.json(results.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/films/:id", async (req, res) => {
  const filmId = req.params.id;
  try {
    const results = await pool.query("SELECT * FROM film WHERE film_id = $1", [filmId]);
    res.json(results.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/films_category", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM film_category");
    res.json(results.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/category", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM category");
    res.json(results.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/category/:name", async (req, res) => {
  const categoryName = req.params.name;
  try {
    const results = await pool.query(
      "SELECT film_category.film_id, film.title AS film_title, category.name AS film_category FROM film JOIN film_category ON film.film_id = film_category.film_id JOIN category ON film_category.category_id = category.category_id WHERE LOWER(name) = LOWER($1)",
      [categoryName]
    );
    res.json(results.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
