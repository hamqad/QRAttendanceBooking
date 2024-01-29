// domain/reports/students/id
// Report for single student

import { useRouter } from "next/router";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import classes from "../report.module.css";
import DatabaseManager from "../../../components/features/DatabaseManager";
import Button from "../../../components/features/Button";

// Details needed for a single student report:
// Basics: name, username, etc...
// COUNTs and AVGs from attendance

const REPORTS_BUTTON = {
  name: "Back to Reports",
  link: "/reports",
};

function Student() {
  const router = useRouter();
  const { studentID } = router.query;

  let thenReport = (res) => {
    // Graph Data
    const data = {
      labels: [
        "# of Modules",
        "AVG Attendance / Module",
        "# of Late Attendance",
        "AVG Late Attendance / Module",
        "AVG Score",
      ],
      datasets: [
        {
          label: "Student Statistics",
          data: [
            res.details["COUNT(num_attended)"],
            res.details["AVG(num_attended)"],
            res.details["SUM(num_late)"],
            res.details["AVG(num_late)"],
            res.details["AVG(score)"],
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    // Return report
    return (
      <div>
        <a className={classes.title}>
          {res.basics.first_name} {res.basics.last_name}
        </a>
        <br />
        <br />
        <div className={classes.details}>
          <a className={classes.detail}>{res.basics.username}</a>
          <br />
          <a className={classes.detail}>{res.basics.email}</a>
          <br />
          <a className={classes.detail}>{res.basics.university_code}</a>
          <br />
        </div>
        <br />
        <div className={classes.report}>
          <br />
          {/* Bar Graph */}
          <div>
            <Bar
              data={data}
              width={400}
              height={300}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  if (studentID)
    return (
      <div>
        <DatabaseManager req="repStudent" slug={studentID} then={thenReport} />
        <br />
        <br />
        <div className={classes.button}>
          <Button param={REPORTS_BUTTON}></Button>
        </div>
      </div>
    );
  else
    return (
      <div>
        <a>LOADING</a>
      </div>
    );
}

export default Student;
