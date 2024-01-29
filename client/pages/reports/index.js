// Report page to help lecturer find wanted report

import Button from "../../components/features/Button";
import classes from "/styles/Home.module.css";


function Reports() {
  const EVENTS_BUTTON = {
    name: "Events",
    link: "/reports/events",
    action: null,
  };

  const MODULES_BUTTON = {
    name: "Modules",
    link: "/reports/modules",
    action: null,
  };

  const STUDENTS_BUTTON = {
    name: "Students",
    link: "/reports/students",
    action: null,
  };

  return (
    <div>
      <h1 className={classes.reporttitle}>Reports</h1>
      <a>
        As a lecturer, you will have access to a number of reports.
        These reports will contain data collected on attendance from your:
        Modules, Events, or Students that attend your events.
      </a>
      <br/><br/>
      <div className={classes.report}>
        <Button param={EVENTS_BUTTON} ></Button><br/><br/>
        <Button param={MODULES_BUTTON}></Button><br/><br/>
        <Button param={STUDENTS_BUTTON}></Button><br/><br/>
      </div>
    </div>
  );
}

export default Reports;
