// Single Item of event lists containing event info

import Button from "./Button.js";
import React, { useState } from "react";
import classes from "./EventItem.module.css";

import DatabaseManager from "./DatabaseManager.js";

// Apply button
const APPLY_BUTTON = {
  name: "Apply",
  link: "/",
  action: null,
};

// Past button
const PAST_BUTTON = {
  name: "Past",
  locked: true,
};

// Locked button
const LOCK_BUTTON = {
  name: "Locked",
  locked: true,
};

// Booked button
const BOOK_BUTTON = {
  name: "Booked",
  locked: true,
};

function EventItem(props) {
  //Obtain info from props
  // All data available.
  // Some may be undefined depending on Axios request
  const attending = props.param.attending;
  const event_date = props.param.event_date;
  const event_end = props.param.event_end;
  const db_id = props.param.event_id;
  const event_start = props.param.event_start;
  const event_title = props.param.event_title;
  const event_type = props.param.event_type;
  const lecturer_id = props.param.lecturer_id;
  const location_id = props.param.location_id;
  const building_name = props.param.building_name;
  const room_name = props.param.room_name;
  const module_code = props.param.module_code;
  const capacity = props.param.capacity;
  const penalty = props.param.penalty;

  const cut_off = props.param.cut_off;

  // State for apply request
  const [request, setRequest] = useState(false); // Where the DBM POST req can be placed and rendered

  // For penalty / application cut-off
  var cut_off_days = 14;

  // For future implementation
  if (cut_off) cut_off_days = cut_off;

  // Choose button using Date
  let now = new Date();
  let cut = new Date();
  let evn = new Date(event_date);
  cut.setDate(now.getDate() + cut_off_days);
  evn.setDate(evn.getDate() + 1);

  let dateN = now.toISOString().substring(0, 10);
  let dateC = cut.toISOString().substring(0, 10);
  let DateE = evn.toISOString().substring(0, 10);

  let past = dateN.localeCompare(DateE); // Return 1 if a past Date
  let lock = event_date.localeCompare(dateC); // Return 1 if a locked Date (beyond cut-off)

  // Function to trigger POST apply request
  let applyAction = () => {
    setRequest(true);
  };

  // Function to convert GET request result into appropriate button
  let thenButton = (res) => {
    // Using Date and Booked data, choose button
    let bType = APPLY_BUTTON; // Default Apply
    if (past > 0) bType = PAST_BUTTON; // Change if past
    if (lock > 0) bType = LOCK_BUTTON; // Change if locked
    if (res.booking_status) bType = BOOK_BUTTON; // Change if booked

    // Add apply action (only available to APPLY_BUTTON)
    bType.action = applyAction;

    return <Button param={bType} />;
  };

  let ins = {
    event_id: db_id,
    student_id: "oid",
  };

  let studentButton = <DatabaseManager req="booked" inputs={ins} then={thenButton} />;

  // Replace with report if lecturer

  let thenStatus = (res) => {
    if(res.lecturer)
    {
      // If upcoming -> details
      // If past -> report

      // Define report button
      let reportParams = {
        name: "Get Report",
        link: "/reports/events/"+db_id,
      };
      // Define details button
      let detailParams = {
        name: "Details",
        link: "/events/"+db_id,
      };
      if(past > 0) return <Button param={reportParams} />;
      return <Button param={detailParams} />;
    }
    // Not lecturer, return application buttons
    return studentButton;
  }

  let generateButton = <DatabaseManager req="status" slug="oid" then={thenStatus} />;

  var reqOut = <></>;
  if (request)
    reqOut = (
      <DatabaseManager
        req="apply"
        type="POST"
        slug="oid"
        inputs={{ event_id: db_id }}
      />
    );

  // Layout Info inside here
  return (
    <div id="container" className={classes.container}>
      <div className={classes.text}>
        <a className={classes.title}>Title: {event_title}</a>
        <br />
        <a className={classes.module}>Module: {module_code}</a>
        <br />
        <a className={classes.date}>Date: {DateE}</a>
        <br /> <br />
        <details>
          <summary>Details</summary>
          <a className={classes.type}>Type: {event_type}</a>
          <br />
          <a className={classes.room}>
            Room: {building_name} {room_name}
          </a>
          <br />
          <a className={classes.time}>Time: {event_start}</a>
          <br />
          <a className={classes.space}>
            Space: {attending}/{capacity}
          </a>
        </details>
        <div className={classes.content}></div>
      </div>
      <div className={classes.button}>
        {generateButton}
        {reqOut}
      </div>
    </div>
  );
}

export default EventItem;
