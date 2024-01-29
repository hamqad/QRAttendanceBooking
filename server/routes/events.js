const express = require("express");
const router = express.Router();
const pool = require("../helpers/database");

const priorityFrame = {attended: [],
  late: [],
  status: []};

//get event with specific ID
router.get("/:id", async function (req, res) {
  try {
      const sqlQuery = `SELECT events.attending, events.event_date, events.event_end, events.event_id, events.event_start,
        events.event_title, events.event_type, events.lecturer_id, events.location_id, events.module_id,
        events.penalty, module.module_code, location.room_name, location.building_name, location.capacity
      FROM events
      INNER JOIN module ON events.module_id=module.module_id
      INNER JOIN location ON events.location_id=location.location_id
      WHERE events.event_id=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//get all events within database
router.get("/", async function (req, res) {
  try {
    const sqlQuery =
      `SELECT events.attending, events.event_date, events.event_end, events.event_id, events.event_start,
              events.event_title, events.event_type, events.lecturer_id, events.location_id, events.module_id,
              events.penalty, module.module_code, location.room_name, location.building_name, location.capacity
        FROM events
        INNER JOIN module ON events.module_id=module.module_id
        INNER JOIN location ON events.location_id=location.location_id`;
    const rows = await pool.query(sqlQuery, req);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//get all past events for user
router.get("/past/:id", async function (req, res) {
  try {
    let dt = new Date().toISOString();
    dt = dt.substring(0,10);
    const sqlQuery =
    `SELECT events.attending, events.event_date, events.event_end, events.event_id, events.event_start,
            events.event_title, events.event_type, events.lecturer_id, events.location_id, events.module_id,
            events.penalty, module.module_code, location.room_name, location.building_name, location.capacity
      FROM assigned
      INNER JOIN events ON assigned.event_id=events.event_id
      INNER JOIN module ON events.module_id=module.module_id
      INNER JOIN location ON events.location_id=location.location_id
      WHERE assigned.student_id=? AND events.event_date < '${dt}'`;
      const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//get all confirmed events for user
router.get("/confirmed/:id", async function (req, res) {
  try {
    const sqlQuery =
    `SELECT events.attending, events.event_date, events.event_end, events.event_id, events.event_start,
            events.event_title, events.event_type, events.lecturer_id, events.location_id, events.module_id,
            events.penalty, module.module_code, location.room_name, location.building_name, location.capacity
      FROM assigned
      INNER JOIN events ON assigned.event_id=events.event_id
      INNER JOIN module ON events.module_id=module.module_id
      INNER JOIN location ON events.location_id=location.location_id
      WHERE assigned.student_id=? AND assigned.booking_status=1`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//get all upcoming events for user
router.get("/upcoming/:id", async function (req, res) {
  try {
    let dt = new Date().toISOString();
    dt = dt.substring(0,10);
    const sqlQuery =
    `SELECT events.attending, events.event_date, events.event_end, events.event_id, events.event_start,
            events.event_title, events.event_type, events.lecturer_id, events.location_id, events.module_id,
            events.penalty, module.module_code, location.room_name, location.building_name, location.capacity
      FROM assigned
      INNER JOIN events ON assigned.event_id=events.event_id
      INNER JOIN module ON events.module_id=module.module_id
      INNER JOIN location ON events.location_id=location.location_id
      WHERE assigned.student_id=? AND events.event_date >= '${dt}'`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get if event is booked
router.get("/booked/:event_id&:student_id", async function (req, res) {
  try {
    const sqlQuery =
    `SELECT booking_status
      FROM assigned
      WHERE student_id=? AND event_id=?`;
    const rows = await pool.query(sqlQuery, [req.params.student_id, req.params.event_id]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get attendance data
router.get("/priority/:id", async function (req, res) {
  try {
    var priority = priorityFrame;
    sqlQuery =
    `SELECT num_attended, num_late
      FROM attendance
      WHERE student_id = ?`;
    rows = await pool.query(sqlQuery, [req.params.id]);

    for(let i = 0; i < rows.length; i++) {
      priority.attended.push(rows[i].num_attended);
      priority.late.push(rows[i].num_late)
    }

    sqlQuery =
    `SELECT booking_status
      FROM assigned
      WHERE booking_status = 1 AND student_id=?`;
    rows = await pool.query(sqlQuery, [req.params.id]);

    for(let i = 0; i < rows.length; i++) {
      priority.status.push(rows[i].booking_status);
    }


    res.status(200).json(priority);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Req to book for an assigned event
router.post("/apply/:id", async function (req, res) {
  try {
    const sqlQuery =
    `UPDATE assigned
      SET booking_status = 1
      WHERE student_id=? AND event_id=${req.body.event_id}`;
    const result = await pool.query(sqlQuery, req.params.id);
    res.status(200).json({ response: result.affectedRows} );
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Create new event for lecturer of ID
router.post("/create/:id", async function (req, res) {
  try {
    // Get inputs
    let ins = req.body;
    const sqlQuery =
    `INSERT INTO events (module_id, lecturer_id, location_id, event_date, event_start, event_end, event_title, event_type, attending, penalty)
      VALUES (${ins.module_id}, ?, ${ins.location_id}, '${ins.event_date}', '${ins.event_start}', '${ins.event_end}', '${ins.event_title}', '${ins.event_type}', ${ins.attending}, ${ins.penalty})`;
    const result = await pool.query(sqlQuery, req.params.id);
    // Given successful addition, assign all students in module.
    if(result.affectedRows) {
        let sqlQuery =
        `SELECT student_id FROM attendance
          WHERE module_id='${ins.module_id}'`
        const students = await pool.query(sqlQuery);
        students.forEach(student => {
            // For each student in module, assign event
            assignStud(student.student_id, result.insertId);
        });
      // Return with created response
      res.status(201).json({response: 201});
    } else {
      // Return with OK response
      res.status(200).json({response: 200});
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

async function assignStud(student_id, event_id) {
  // Separate func to use await.
  let sqlQuery =
  `INSERT INTO assigned (student_id, event_id, booking_status, attendance_time)
    VALUES ('${student_id}', '${event_id}', 0, null)`
  const assigned_result = await pool.query(sqlQuery);
  return assigned_result;
}

module.exports = router;
