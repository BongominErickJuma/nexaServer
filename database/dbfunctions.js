import db from "./connect.js";

async function getResources(resources) {
  try {
    const res = await db.query(`SELECT * FROM ${resources} ORDER BY id ASC `);
    return res.rows;
  } catch (error) {
    console.log("Trouble executing query:", error);
    throw error;
  }
}

export { getResources };
