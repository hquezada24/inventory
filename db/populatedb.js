#!/usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const createTableSQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255),
  slug VARCHAR (255)
);
`;

const insertSQL = `
INSERT INTO categories (name, slug) 
VALUES
  ('Lácteos y refrigerados', ('lacteos-y-refrigerados')),
  ('Hogar', ('hogar')),
  ('Higiene personal', ('higiene-personal')),
  ('Abarrotes', 'abarrotes'),
  ('Panadería', 'panaderia'),
  ('Bebidas y jugos', 'bebidas-y-jugos'),
  ('Dulces y botanas', 'dulces-y-botanas')
ON CONFLICT DO NOTHING;  -- optional: avoids duplicate insert errors
`;

const itemsTableSQL = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255),
  price NUMERIC(10, 2),
  stock INTEGER,
  category_id INTEGER REFERENCES categories(id));`;

const insertItemsSQL = `
INSERT INTO items (name, price, stock, category_id) 
VALUES
  ('Leche', 1.50, 100, 1),
  ('Queso', 1.20, 50, 1),
  ('Detergente', 2.00, 200, 2),
  ('Suavizante', 2.50, 180, 2),
  ('Jabon de trastes', 0.99, 150, 2),
  ('Pasta de dientes', 1.25, 120, 3),
  ('Jabón', 0.99, 150, 3),
  ('Champú', 3.50, 80, 3),
  ('Papel higiénico', 1.75, 120, 2),
  ('Arroz', 0.80, 300, 4),
  ('Frijoles', 0.90, 250, 4),
  ('Azúcar', 1.00, 200, 4),
  ('Harina', 1.20, 180, 4),
  ('Pan de caja', 1.50, 150, 5),
  ('Pan dulce', 1.75, 100, 5),
  ('Agua embotellada', 0.50, 500, 6),
  ('Jugo de naranja', 1.25, 200, 6),
  ('Refresco', 1.00, 300, 6),
  ('Chips de papa', 1.50, 250, 7),
  ('Chocolate', 2.00, 200, 7);`;

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
    await client.query(itemsTableSQL);
    await client.query(insertItemsSQL);
    console.log("Tables created and data inserted successfully.");
    console.log("Done!");
  } catch (err) {
    console.error("Error seeding:", err);
  } finally {
    await client.end();
  }
}

main();
