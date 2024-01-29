// domain/reports/students/
// Page to list all avaliable student reports

import ReportList from "../../../components/features/reports/ReportList";
import DatabaseManager from "../../../components/features/DatabaseManager";

// STUDENT: report_type, first_name, last_name, username, university_code, module_list, acedemic_year, db_id

function reportStudents() {

  // Setup Database retrival of reports

  let thenReports = (res) => {
    // Clean attribute names for ReportList
    res.forEach((report, index) => {
      res[index].report_type = "students";   // Set type
      res[index].db_id = report.student_id;  // Set db_id
    });
    return <ReportList reports={res} type="students"></ReportList>;
  }

  var reports = <DatabaseManager req="repStudents" slug="oid" then={thenReports}/>

  return (
    <>
      {reports}
    </>
  );
}

export default reportStudents;
