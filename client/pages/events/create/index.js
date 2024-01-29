// domain/create/
// Event creation page for lecturer

import Button from "../../../components/features/Button";
import EventOption from "../../../components/features/EventOption";
import React, { useRef, useEffect, useState } from "react";
import classes from "./create.module.css";

import DatabaseManager from "../../../components/features/DatabaseManager";

const EVENT_NAME = {
  name: "Event Title",
  input: "text",
  optionID: 0,
};

// For module values
const thenModVals = (res) => {
  let vals = [];
  vals.push(<option key={-1} value={''}>Select a Module</option>);
  res.forEach(module => {
    vals.push(<option key={module.module_id} value={module.module_id}>{module.module_name}</option>)
  });
  return vals;
}

const EVENT_MODULE = {
  name: "Module",
  input: "dropdown",
  dbvalues: <DatabaseManager req="modules" slug="oid" then={thenModVals}></DatabaseManager>,
  optionID: 1,
};

const EVENT_TYPE = {
  name: "Type",
  input: "dropdown",
  values: ["Lecture", "Lab", "Tutorial", "Workshop"],
  optionID: 2,
};

const EVENT_DATE = {
  name: "Date",
  input: "date",
  optionID: 3,
};

const EVENT_TIME = {
  name: "Start Time",
  input: "time",
  optionID: 4,
};

const EVENT_END = {
  name: "Finish Time",
  input: "time",
  optionID: 5,
};

// For location values
const thenLocVals = (res) => {
  let opts = [];
  opts.push(<option key={-1} value={''}>Select a Location</option>);
  res.forEach(location => {
    opts.push(<option key={location.location_id} value={location.location_id}>{location.building_name+" : "+location.room_name}</option>)
  });
  return opts;
}

const EVENT_LOCATION = {
  name: "Location",
  input: "dropdown",
  dbvalues: <DatabaseManager req="locations" then={thenLocVals}></DatabaseManager>,
  optionID: 6,
};

const EVENT_PENALTY_RATE = {
  name: "Penalty Rate",
  input: "dropdown",
  values: ["None", "Light", "Medium", "Harsh"],
  optionID: 7,
};

const EVENT_QR_TYPE = {
  name: "QR Code Type",
  input: "dropdown",
  values: ["Dynamic", "Static"],
  optionID: 8,
};

const EVENT_OPTIONS = [
  EVENT_NAME,
  EVENT_MODULE,
  EVENT_TYPE,
  EVENT_DATE,
  EVENT_TIME,
  EVENT_END,
  EVENT_LOCATION,
  EVENT_PENALTY_RATE,
  EVENT_QR_TYPE,
];

function Create() {
  // States to handle Get and Posts
  const [postStatus, setPostStatus] = useState(false);
  const [opts, setOpts] = useState([
    '',
    '',
    "Lecture",
    '',
    '',
    '',
    '',
    "None",
    "Dynamic",
  ]);
  const postReq = useRef(<></>);

  // Button press action (here for scope)
  const submitHandle = () => {
    if (opts.every((value) => (value !== ''))) {
      setPostStatus(true);
    }
  };

  // Button definition
  const CREATE_EVENT_BUTTON = {
    name: "Create Event",
    action: submitHandle,
  };

  // Post request
  useEffect(() => {
    if (postStatus) {
      // Create POST request and inputs
      let ins = {
        module_id: opts[1],
        // Lecturer ID is taken from slug
        location_id: opts[6],
        event_date: opts[3],
        event_start: opts[4],
        event_end: opts[5],
        event_title: opts[0],
        event_type: opts[2],
        attending: 0,
        penalty: EVENT_PENALTY_RATE.values.indexOf(opts[7]), // Convert from string to corresponding int
        // Include QR type where??
      };
      let thenHandle = (res) => {
        if (res.response == 201)
          window.alert("Your event has been successfully created.");
        else
          window.alert("Your event could not be created.");
        optCreation();
        setPostStatus(false);
        return null;
      }
      postReq.current = (
        <DatabaseManager
          req="create"
          type="POST"
          inputs={ins}
          then={thenHandle}
          slug="oid"
        ></DatabaseManager>
      );
      setPostStatus(false);
    }
    else
      postReq.current = <></>;
  }, [postStatus]);

  // Option change handle
  let handle = (e, index) => {
    let v = e.target.value;
    let tempOpts = opts;
    tempOpts[index] = v;
    setOpts(tempOpts);
  };

  // Create options
  var eventOptions = [];
  let optCreation = () => {
    eventOptions = [];
    EVENT_OPTIONS.forEach((option, index) => {
      // For each option
      let eventOption = (
        <EventOption
          key={index}
          param={option}
          init={opts[index]}
          changeHandle={handle}
        ></EventOption>
      );
      eventOptions.push(eventOption);
    });
  }

  optCreation();

  return (
    <div>
      <div className={classes.header}>
        <a>Create Event</a>
      </div>
      <br></br>
      <br></br>
      <fieldset className={classes.fieldset}>
      <legend>Event Details</legend>
      {eventOptions}
      </fieldset>
      <br></br>
      <div className={classes.button}>
        <Button param={CREATE_EVENT_BUTTON}></Button>
      </div>
      {postReq.current}
    </div>
  );
}
export default Create;
