const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const { Pool } = require("pg");
require("dotenv").config();

// Take credentials from file ".env"
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(` 
    CREATE TABLE IF NOT EXISTS tiere (   
    id SERIAL PRIMARY KEY,
    tierart VARCHAR(50),
    name VARCHAR(50),
    krankheit VARCHAR(100),
    age INT,
    gewicht REAL);
        `);
    console.log("✅ Table 'tiere' exists/created!");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  } finally {
    client.release();
  }
};

createTable();

app.use(express.json()); // Ermöglicht Express Json aus einem Body auszulesen
app.use(express.static("public"));

app.get("/tiere", async (req, res) => {
  const result = await pool.query("SELECT * FROM tiere");
  res.json(result.rows);
});

app.post("/tiere", async (req, res) => {
  const { tierart, name, krankheit, age, gewicht } = req.body;
  await pool.query(
    `INSERT INTO tiere (tierart, name, krankheit, age, gewicht)
     VALUES ($1, $2, $3, $4, $5)`,
    [tierart, name, krankheit, age, gewicht]
  );
  res.status(201).send("Tier wurde erfolgreich hinzugefügt");
});

app.delete("/tiere/:id", async (req, res) => {
  const id = req.params.id;

  await pool.query(`DELETE FROM tiere WHERE id = $1`, [id]);

  res.status(200).send("Eintrag gelöscht");
});

app.listen(3000);
