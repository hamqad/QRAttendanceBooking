// domain/reports/events/id
// Report for single event

import { useRouter } from "next/router";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import classes from "../report.module.css";
import DatabaseManager from "../../../components/features/DatabaseManager";
import Button from "../../../components/features/Button";

// Details needed for a single event report:
// Basics like name, time, module etc..
// num Assigned: COUNT *
// num Booked: COUNT * WHERE ..
// num Attened: COUNT * WHERE time..

const REPORTS_BUTTON = {
  name: "Back to Reports",
  link: "/reports",
};

function Event() {
  const router = useRouter();
  const { eventID } = router.query;

  let thenReport = (res) => {
    // Graphing Data
    const data = {
      labels: ["# of Students", "# of Bookings", "# of Attendees"],
      datasets: [
        {
          label: "Event Statistics",
          data: [
            res.details["COUNT(student_id)"],
            res.details["SUM(booking_status)"],
            res.details["COUNT(attendance_time)"],
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Return report
    return (
      <div>
        <a className={classes.title}>{res.basics.event_title}</a>
        <br />
        <br />
        <div className={classes.details}>
          <a className={classes.detail}>{res.basics.event_type}</a>
          <br />
          <a className={classes.detail}>{res.basics.module_code}</a>
          <br />
          <a className={classes.detail}>
            {res.basics.event_date.substring(0, 10)}
          </a>
          <br />
          <a className={classes.detail}>
            {res.basics.event_start} TO {res.basics.event_end}
          </a>
          <br />
        </div>
        <br />
        <div className={classes.details}>
          <a className={classes.detail}>{res.basics.building_name}</a>
          <br />
          <a className={classes.detail}>{res.basics.room_name}</a>
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
          <br />
          <a className={classes.detail}>
            Average Student Arrival Time:{" "}
            {res.details["CAST(AVG(attendance_time) AS TIME)"]}
          </a>
        </div>
      </div>
    );
  };

  if (eventID)
    return (
      <div>
        <DatabaseManager req="repEvent" slug={eventID} then={thenReport} />
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

export default Event;
