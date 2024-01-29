const express = require("express");
const router = express.Router();
const pool = require("../helpers/database");

//get all upcoming events for user
router.get("/all/", async function (req, res) {
    try {
      const sqlQuery =
      `SELECT location_id, building_name, room_name
       FROM location`;
      const rows = await pool.query(sqlQuery);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

module.exports = router;