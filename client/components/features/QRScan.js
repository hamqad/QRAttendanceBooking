import dynamic from "next/dynamic";
import React, { useState } from "react";
import classes from "./QRScan.module.css";

import DatabaseManager from "./DatabaseManager";

const QrReader = dynamic(() => import("react-qr-reader"), {
  ssr: false,
});

// Conversion between response codes and Messages
const RESPONSES = [
  "Attendance Marked",
  "Attendance Already Marked",
  "Event Not Booked",
  "QR Does Not Exist",
];

function QRScan() {
  const [data, setData] = useState(null);

  // Update data on successful scan
  let handleScan = (data) => {
    if (data) {
      setData(data);
    }
  };

  // Print scan error
  let handleError = (err) => {
    console.error(err);
  };

  let ins = {
    id: data,
    student_id: "oid",
  };

  // On successful POST
  let reroute = (res) => {
    alert(RESPONSES[res.response]);
    if (res.response == 0) {
      // Response 0 - Return to homepage
      window.location = "/";
    }
    // Refresh page for reset state (Likely better solution)
    else window.location.reload(true);
    return null;
  };

  // Initial blank to avoid invoking bad request
  let post = <></>;
  if (data != null)
    post = (
      <DatabaseManager req="qrscan" type="POST" inputs={ins} then={reroute} />
    );

  console.log(data);

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        className={classes.scanner}
      />
      {post}
    </div>
  );
}

export default QRScan;
