const express = require("express");
const router = express.Router();
const pool = require("../helpers/database");

// Get all data relating to a user by oid
router.get("/:id", async function (req, res) {
  try {
    const sqlQuery = "SELECT * FROM users WHERE user_id=?";
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Override to make any user a lecturer
const lecOverride = true;

// Return whether oid is student or lecturer
router.get("/status/:id", async function (req, res) {
  try {
    var out = {
      student: false,
      lecturer: false,
    };
    // Check student table
    const sqlQueryA = "SELECT student_id FROM student WHERE user_id=?";
    const rowsA = await pool.query(sqlQueryA, req.params.id);
    // Check lecturer table
    const sqlQueryB = "SELECT lecturer_id FROM lecturer WHERE user_id=?";
    const rowsB = await pool.query(sqlQueryB, req.params.id);
    // Formulate result
    out.student = rowsA[0];
    out.lecturer = rowsB[0];

    // Override to lecturer
    if(lecOverride)
    {
      out.student = false;
      out.lecturer = true;
    }


    res.status(200).json(out);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
