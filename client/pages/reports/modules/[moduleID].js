// domain/reports/modules/id
// Report for single module

import { useRouter } from "next/router";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import classes from "../report.module.css";
import DatabaseManager from "../../../components/features/DatabaseManager";
import Button from "../../../components/features/Button";

// Details needed for a single module report:
// Basics: Module title, code, year,
// num Assigned: COUNT *
// num Booked: COUNT * WHERE ..
// num Attened: COUNT * WHERE time..

const REPORTS_BUTTON = {
  name: "Back to Reports",
  link: "/reports",
};

function Module() {
  const router = useRouter();
  const { moduleID } = router.query;

  let thenReport = (res) => {
    // Graphing Data
    const data = {
      labels: [
        "# of Students",
        "AVG Attendance",
        "AVG Late Attendance",
        "AVG Student Score",
      ],
      datasets: [
        {
          label: "Module Statistics",
          data: [
            res.details["COUNT(student_id)"],
            res.details["AVG(num_attended)"],
            res.details["AVG(num_late)"],
            res.details["AVG(score)"],
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Return report
    return (
      <div>
        <a className={classes.title}>{res.basics.module_name}</a>
        <br />
        <br />
        <div className={classes.details}>
          <a className={classes.detail}>{res.basics.module_code}</a>
          <br />
          <a className={classes.detail}>{res.basics.module_year}</a>
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
        <a></a>
      </div>
    );
  };

  if (moduleID)
    return (
      <div>
        <DatabaseManager req="repModule" slug={moduleID} then={thenReport} />
        <br />
        <br />
        <Button param={REPORTS_BUTTON}></Button>
      </div>
    );
  else
    return (
      <div>
        <a>LOADING</a>
      </div>
    );
}

export default Module;
