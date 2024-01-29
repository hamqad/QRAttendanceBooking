const express = require("express");
const router = express.Router();
const pool = require("../helpers/database");

// Get all available reports for events
router.get("/events/:id", async function (req, res) {
  try {
    const sqlQuery = `SELECT event_title, event_date, event_start, module.module_code, event_type, penalty, event_id
         FROM events
         INNER JOIN module ON events.module_id = module.module_id
         WHERE lecturer_id=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get details on a single event for report
router.get("/event/:id", async function (req, res) {
  try {
    // GET BASICS
    const sqlQueryA = 
    `SELECT events.attending, events.event_date, events.event_end, events.event_id, events.event_start,
    events.event_title, events.event_type, events.lecturer_id, events.location_id, events.module_id,
    events.penalty, module.module_code, location.room_name, location.building_name, location.capacity
    FROM events
    INNER JOIN module ON events.module_id=module.module_id
    INNER JOIN location ON events.location_id=location.location_id
    WHERE events.event_id=?`;
    const basics = await pool.query(sqlQueryA, req.params.id);
    // GET ASSIGNMENT
    const sqlQueryB = 
        `SELECT COUNT(student_id), SUM(booking_status), COUNT(attendance_time), CAST(AVG(attendance_time) AS TIME)
         FROM assigned
         WHERE event_id=?`;
    const details = await pool.query(sqlQueryB, req.params.id);
    const data = {basics: basics[0], details: details[0]}
    // Format from bigInt
    data.details['COUNT(student_id)'] = Number(data.details['COUNT(student_id)']);
    data.details['COUNT(attendance_time)'] = Number(data.details['COUNT(attendance_time)']);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all available reports for modules
router.get("/modules/:id", async function (req, res) {
  try {
    const sqlQuery = `SELECT module.module_name, module.module_code, module.module_year, module.module_id
           FROM modulelecturer
           INNER JOIN module ON module.module_id = modulelecturer.module_id
           WHERE lecturer_id=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get details on a single module for report
router.get("/module/:id", async function (req, res) {
  try {
    // GET BASICS
    const sqlQueryA = 
    `SELECT module_name, module_code, module_year
    FROM module
    WHERE module_id=?`;
    const basics = await pool.query(sqlQueryA, req.params.id);
    // GET ATTENDANCE
    const sqlQueryB = 
        `SELECT COUNT(student_id), AVG(num_attended), AVG(num_late), AVG(score)
         FROM attendance
         WHERE module_id=?`;
    const details = await pool.query(sqlQueryB, req.params.id);
    const data = {basics: basics[0], details: details[0]}
    // Format from bigInt
    data.details['COUNT(student_id)'] = Number(data.details['COUNT(student_id)']);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all available reports for students
router.get("/students/:id", async function (req, res) {
  try {
    const sqlQuery = `SELECT DISTINCT users.first_name, users.last_name, users.username, student.university_code, student.student_id
           FROM attendance
           INNER JOIN users ON attendance.student_id = users.user_id
           INNER JOIN student ON attendance.student_id = student.user_id
           WHERE lecturer_id=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get details on a single student for report
router.get("/student/:id", async function (req, res) {
  try {
    // GET BASICS
    const sqlQueryA = 
    `SELECT first_name, last_name, username, email, student.university_code
    FROM users
    INNER JOIN student ON users.user_id = student.user_id
    WHERE student.student_id=?`;
    const basics = await pool.query(sqlQueryA, req.params.id);
    // GET ATTENDANCE
    const sqlQueryB = 
        `SELECT COUNT(num_attended), AVG(num_attended), SUM(num_late), AVG(num_late), AVG(score)
         FROM attendance
         INNER JOIN student ON attendance.student_id = student.user_id
         WHERE student.student_id=?`;
    const details = await pool.query(sqlQueryB, req.params.id);
    const data = {basics: basics[0], details: details[0]}
    // Format from bigInt
    data.details['COUNT(num_attended)'] = Number(data.details['COUNT(num_attended)']);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
