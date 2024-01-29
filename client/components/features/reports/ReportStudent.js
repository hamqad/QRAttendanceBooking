// Item for Students in Reports

import ReportItem from "./ReportItem";
import classes from "./ReportItem.module.css";

// STUDENT: report_type, first_name, last_name, username, university_code, module_list, acedemic_year, db_id

class ReportStudent extends ReportItem {
  // Data inherited from ReportItem

  displayData() {
    // Specific display for Student reports

    return (
      <div className={classes.text_container}>
        <a className={classes.text}>{this.data.first_name}</a>
        <a className={classes.text}>{this.data.last_name}</a>
        <br/>
        <a className={classes.text}>{this.data.username}</a>
        <br/>
        <a className={classes.text}>{this.data.university_code}</a>
      </div>
    );
  }

}

export default ReportStudent;
