const pool = require("../query.js");
const fs = require("fs");

const seedingQuery = fs.readFileSync("db/seeding.sql", { encoding: "utf-8" });
pool.query(seedingQuery, (err, res) => {
  console.log(err);
  console.log("Seeding has been successfully");
  pool.end();
});
