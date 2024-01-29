// domain/reports/modules/
// Page to list all avaliable module reports

import ReportList from "../../../components/features/reports/ReportList";
import DatabaseManager from "../../../components/features/DatabaseManager";

// MODULE: report_type, title, module_code, module_year, db_id

function reportModules() {

  // Setup Database retrival of reports

  let thenReports = (res) => {
    // Clean attribute names for ReportList
    res.forEach((report, index) => {
      res[index].report_type = "modules";    // Set type
      res[index].db_id = report.module_id;   // Set db_id
      res[index].title = report.module_name; // Set title
    });
    return <ReportList reports={res} type="modules"></ReportList>;
  }

  var reports = <DatabaseManager req="repModules" slug="oid" then={thenReports}/>

  return (
    <>
      {reports}
    </>
  );
}

export default reportModules;
