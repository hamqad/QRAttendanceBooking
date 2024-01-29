const express = require("express");
const router = express.Router();
const pool = require("../helpers/database");

//get all modules assigned to lecturer
router.get("/lecturer/:id", async function (req, res) {
    try {
      const sqlQuery =
      `SELECT module.module_id, module.module_name
       FROM modulelecturer
       INNER JOIN module ON module.module_id=modulelecturer.module_id
       WHERE modulelecturer.lecturer_id=?`;
      const rows = await pool.query(sqlQuery, req.params.id);
      res.status(200).json(rows);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

module.exports = router;