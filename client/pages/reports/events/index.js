// domain/reports/events/
// Page to list all avaliable event reports

import ReportList from "../../../components/features/reports/ReportList";
import DatabaseManager from "../../../components/features/DatabaseManager";

// EVENT: report_type, title, mod_id, type, penalty, event_db_id

function reportEvents() {

  // Setup Database retrival of reports

  let thenReports = (res) => {
    // Clean attribute names for ReportList
    res.forEach((report, index) => {
      res[index].report_type = "events";     // Set type
      res[index].db_id = report.event_id;    // Set db_id
      res[index].title = report.event_title; // Set title
    });
    return <ReportList reports={res} type="events"></ReportList>;
  }

  var reports = <DatabaseManager req="repEvents" slug="oid" then={thenReports}/>

  return (
    <>
      {reports}
    </>
  );
}

export default reportEvents;
