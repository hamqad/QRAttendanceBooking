// Component for general report item

import Button from "../Button";
import React, { Component } from "react";
import classes from "./ReportItem.module.css";

// STUDENT: report_type, name, lname, username, s_id, module_list, acedemic_year, db_id
// MODULE: report_type, title, mod_id, acedemic_year, semester, penalty,  db_id
// EVENT: report_type, title, module_code, event_type, event_date, event_start, penalty, db_id

class ReportItem extends Component {
  constructor(props) {
    super();
    this.data = props.report;
  }

  makeButton() {
    return {
      name: "Report",
      link: "/reports/" + this.data.report_type + "/" + this.data.db_id,
      action: null,
    };
  }

  displayData() {
    return <a>NULL</a>;
  }

  render() {
    return (
      <div className={classes.item}>
        <div>{this.displayData()}</div>
        <div className={classes.button}>
          <Button param={this.makeButton()}></Button>
        </div>
      </div>
    );
  }
}

export default ReportItem;
