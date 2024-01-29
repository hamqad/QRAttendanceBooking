import React, { useState } from "react";
import DatabaseManager from "./DatabaseManager.js";


function PriorityScore(props) {
    //Obtain info from props
    // All data available.
    // Some may be undefined depending on Axios request
    const booked = props.param.booked;
    const late = props.param.late;
    const attended = props.param.attended;
    
    totalAttended;
    totalLate;
    totalBooked;
    mainScore;
    lateScore;
    totalScore;

    for(let i = 0; i < attended; i++){
        totalAttended += attended[i];
    }

    for(let i = 0; i < late; i++){
        totalLate += late[i];
    }

    for(let i = 0; i < booked; i++){
        totalBooked++;
    }

    mainScore = totalAttended/totalBooked;
    lateScore = (totalLate/totalBooked) / 3;
    totalScore = mainScore - lateScore;

    return totalScore;

};

export default PriorityScore;