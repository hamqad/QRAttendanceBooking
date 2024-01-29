// Item for Modules in Reports

import ReportItem from "./ReportItem";
import classes from "./ReportItem.module.css";

// MODULE: report_type, title, module_code, module_year, db_id

class ReportModule extends ReportItem {
  // Data inherited from ReportItem

  displayData() {
    // Specific display for Module reports

    return (
      <div className={classes.text_container}>
        <a className={classes.text}>{this.data.title}</a>
        <a className={classes.text}>{this.data.module_year}</a>
        <br/>
        <a className={classes.text}>{this.data.module_code}</a>
      </div>
    );
  }

}

export default ReportModule;
