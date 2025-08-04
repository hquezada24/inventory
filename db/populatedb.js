#!/usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const createTableSQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255)
);
`;

const insertSQL = `
INSERT INTO categories (name) 
VALUES
  ('Lácteos y refrigerados'),
  ('Hogar'),
  ('Higiene personal'),
  ('Bebidas'),
  ('Abarrotes'),
  ('Panadería'),
  ('Bebidas y jugos'),
  ('Dulces y botanas')
ON CONFLICT DO NOTHING;  -- optional: avoids duplicate insert errors
`;

async function main() {
  console.log("Seeding...");
  const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
  console.log("Connecting to:", connectionString);

  const client = new Client({
    connectionString,
    //connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });

  try {
    await client.connect();
    await client.query(createTableSQL);
    await client.query(insertSQL);
    console.log("Done!");
  } catch (err) {
    console.error("Error seeding:", err);
  } finally {
    await client.end();
  }
}

main();
