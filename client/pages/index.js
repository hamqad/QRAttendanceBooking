// domain/
// Homepage

import AccountIcon from "../components/features/AccountIcon";
import HomepageButtons from "../components/layout/HomepageButtons";
import Button from "../components/features/Button";
import classes from "/styles/Home.module.css";
import { useMsal } from '@azure/msal-react';
//import "../styles/globals";

import DatabaseManager from "../components/features/DatabaseManager";

function Homepage() {
  //-Student Buttons
  const REGISTER_BUTTON = {
    name: "Register Attendance",
    link: "/scan",
  };
  const UPCOMING_EVENTS_BUTTON = {
    name: "Upcoming Events",
    link: "/events/upcoming",
  };
  const CONFIRMED_EVENTS_BUTTON = {
    name: "Confirmed Events",
    link: "/events/confirmed",
  };
  const PAST_EVENTS_BUTTON = {
    name: "Past Events",
    link: "/events/past",
  };

  //-Lecturer Buttons
  const CREATE_BUTTON = {
    name: "Create Event",
    link: "/events/create",
  };
  const REPORTS_BUTTON = {
    name: "Reports",
    link: "/reports",
    action: null,
  };
  const { accounts } = useMsal();
  var account_icon = {
    name: "Not Signed In.",
    icon: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    user: "",
  };
  
  //if (typeof window !== "undefined"){ // If this code is being run on the client,
  if (accounts[0]) {
    let tempName = accounts[0].name;;
    let tempUser = accounts[0].username;
    account_icon = {
      name: tempName,
      icon: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      user: tempUser,
    };
  }

  // Obtain status
  let role = (res) => {
    if (res.student) {
      return (
        <div><p className={classes.account}>Student</p>
        <HomepageButtons>
        <br></br>
          <Button param={REGISTER_BUTTON}></Button>
          <br></br>
          <Button param={UPCOMING_EVENTS_BUTTON}></Button>
          <br></br>
          <Button param={CONFIRMED_EVENTS_BUTTON}></Button>
        </HomepageButtons>
        </div>
      );
    }
    if (res.lecturer) {
      return (
      <div><p className={classes.account}>Lecturer</p>
      <HomepageButtons>
      <br></br>
        <Button param={CREATE_BUTTON}></Button>
        <br></br>
        <Button param={UPCOMING_EVENTS_BUTTON}></Button>
        <br></br>
        <Button param={PAST_EVENTS_BUTTON}></Button>
        <br></br>
        <Button param={REPORTS_BUTTON}></Button>
      </HomepageButtons>
    </div>
      );
    }
    return <p className={classes.missing}>User Not Found</p>;
  }
  var status = <DatabaseManager req="status" slug="oid" then={role}/>;

  return (
    <div>
      <br></br>
      <AccountIcon param={account_icon}></AccountIcon>
      {status}
    </div>
  );
}

export default Homepage;
