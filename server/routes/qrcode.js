const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
var SHA256 = require("crypto-js/sha256");
//get event with specific ID

router.post('/', async function(req,res) {
    try {
        const {id, student_id} = req.body;
        sqlQuery = "SELECT event_id FROM eventqr WHERE qr_string=?";
        result = await pool.query(sqlQuery, [id]);

        
        if (result.length == 0) {
            res.status(200).json({response: 3});
        } else {
            var currentEventID = result[0].event_id;

            sqlQuery = "SELECT booking_status, attendance_time FROM assigned WHERE event_id=? AND student_id=?";
            result = await pool.query(sqlQuery, [currentEventID, student_id]);

            if (result[0].booking_status == 1) {

                if (result[0].attendance_time == null) {

                    //forms current date with date object
                    const date = new Date();
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    let seconds = date.getSeconds();
                    strdate = `${hours}:${minutes}:${seconds}`;

                    sqlQuery = 'UPDATE assigned SET attendance_time=? WHERE event_id=? AND student_id=?';
                    result = await pool.query(sqlQuery, [strdate, currentEventID, student_id]);
                    res.status(200).json({response: 0});
                }
                else {
                    res.status(200).json({response: 1});
                }
            }
            else {
                res.status(200).json({response: 2});
            }
        }
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/create/:id', async function(req,res) {
    try {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        strdate = `${hours}:${minutes}:${seconds}`;
        qrString = req.params.id+strdate;
        sqlQuery = "UPDATE eventqr SET qr_string = ? WHERE event_id = ?";
        console.log(req.params.id);
        console.log(qrString);
        qrString = SHA256(qrString).toString();
        console.log(qrString);
        result = await pool.query(sqlQuery, [qrString,req.params.id]);
        res.status(200).json({qr: qrString});
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;