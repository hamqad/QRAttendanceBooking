// Used for ease of communication between webpage and axios

import React, { useRef, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

const axios = require("axios");

const BASE_URL = "http://localhost:3001";

const REQUESTS = {
  // List of all known requests matched to HTTP request address
  status: "/users/status/",
  events: "/events/",
  create: "/events/create/",
  past: "/events/past/",
  confirmed: "/events/confirmed/",
  upcoming: "/events/upcoming/",
  booked: "/events/booked/",
  apply: "/events/apply/",
  modules: "/modules/lecturer/",
  locations: "/locations/all/",
  repEvents: "/reports/events/",
  repEvent: "/reports/event/",
  repModules: "/reports/modules/",
  repModule: "/reports/module/",
  repStudents: "/reports/students/",
  repStudent: "/reports/student/",
  qrscan: "/qrcode/",
  qrcode: "/qrcode/create/",
};

// Default then to return numbers for each data entry returned (Requires no data accesss)
const DEF_THEN = (_) => {
  return <></>;
};

// GET or POST requests
const GET = (req, handler) => {
  axios
    .get(BASE_URL+req)
    .then(handler)
    .catch((err) => console.log(err));
};
const POST = (req, handler, inputs) => {
  axios
    .post(BASE_URL+req, inputs)
    .then(handler)
    .catch((err) => console.log(err));
};

// Eases Communication to Database
// Inputs:
//  String Key 'req' to represent one of stored HTTP addresses above (REQUESTS)
//  String 'slug' to append url
//  Function 'then' to convert returned data into appropriate format
//  String 'type' either GET or POST, default to get
//  Object 'inputs' information to be passed through http request.
function DatabaseManager(props) {
  // Return if in server
  if (typeof window == "undefined") return null;

  // Get user data
  // To be used to determine authenticity of request (TO BE IMPLEMENTED)
  var { accounts } = useMsal();
  var oid;
  if (accounts[0]) {
    oid = accounts[0].idTokenClaims.oid;
  }

  // Get data request
  let reqKey = props.req;
  var req = REQUESTS[reqKey];
  if (!req) {
    console.log("INVALID HTTP REQUEST : " + reqKey);
    return null;
  }

  // Get request type
  var type = props.type;
  if (!(type == "POST")) type = "GET";

  // Add slug
  var slug = props.slug;
  if (slug == "oid") slug = oid;
  if (slug != null) req = req + slug;

  // Get then function handler
  var then = props.then;
  if (!then) then = DEF_THEN;

  let handler = (res) => {
    // If this errors, check return type of then is displayable html.
    setData(then(res.data));
  };

  // Get inputs
  var inputs = props.inputs;
  // Fill oid requests
  if (inputs) {
    const inKeys = Object.keys(inputs);
    inKeys.forEach((key, _) => {
      if (inputs[key]=="oid")
        inputs[key] = oid;
    });
  }

  // Convert inputs to slug if GET request
  if(type=="GET"&&inputs) req = req + Object.keys(inputs).map(key => inputs[key]).join('&');

  // Validation? TO BE IMPLEMENTED

  // Setup component states
  const [data, setData] = useState([]);
  const changeRef = useRef(false);

  useEffect(() => {
    // Get only once
    if (!changeRef.current) {
      // Determine function to use
      if (type == "GET") GET(req, handler);
      else POST(req, handler, inputs);
      // Flag change reference to prevent loop
      changeRef.current = true;
    }
  });

  return data;
}

export default DatabaseManager;
