// Item for Events in Reports

import ReportItem from "./ReportItem";
import classes from "./ReportItem.module.css";

// EVENT: report_type, title, module_code, event_type, event_date, event_start, penalty, db_id

class ReportEvent extends ReportItem {
  // Data inherited from ReportItem

  displayData() {
    // Specific display for Event reports
    return (
      <div className={classes.text_container}>
        <a className={classes.text}>{this.data.title}</a>
        <br/>
        <a className={classes.text}>{this.data.module_code}</a>
        <a className={classes.text}>{this.data.event_type}</a>
        <br/>
        <a className={classes.text}>{this.data.event_date.substring(0,10)}</a>
        <a className={classes.text}>{this.data.event_start}</a>
      </div>
    );
  }

}

export default ReportEvent;
