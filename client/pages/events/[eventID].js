// domain/events/id
// Page for single Event.
// Edit options / create new

import DatabaseManager from "../../components/features/DatabaseManager";
import Button from "../../components/features/Button";
import EventData from "../../components/features/EventData";
import classes from "./[eventID].module.css";
import { useRouter } from "next/router";

const GENERATE_QR_BUTTON = {
  name: "Display QR",
  link: null,
  action: null,
};

function Event() {
  const router = useRouter();
  const { eventID } = router.query;

  if (eventID !== undefined) {
    // If router correctly gets the event id then search for event

    // Function to format Event data into EventData component
    let setupEvent = (data) => {
      let display = <></>;
      if (data[0]) {
        // Event found, use data[0]
        var QRButton = GENERATE_QR_BUTTON;
        QRButton.link = "/display/"+eventID;
        display = <div><EventData param={data[0]} /><div className={classes.button}><Button param={QRButton}></Button></div></div>;
      } else {
        // No Event found, tell user
        display = <div className={classes.text}><a>ERROR: NO EVENT FOUND</a></div>;
      }
      return display;
    };

    // Return formatted GET request
    return (
      <div>
        <DatabaseManager req="events" slug={eventID} then={setupEvent} />
      </div>
    );
  } else {
    // Wait for router to correctly pull
    return <a>LOADING</a>;
  }
}

export default Event;