// Container for Events which displays them clearly and orderly

import classes from "./EventList.module.css";

function EventList(props) {
  return <div className={classes.container}>{props.children}</div>;
}

export default EventList;
