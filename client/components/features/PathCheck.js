// Component to be used to check for valid paths

import { useRouter } from "next/router";
import { useMsal } from "@azure/msal-react";

import DatabaseManager from "./DatabaseManager";
import PathStatusBlock from "./PathStatusBlock";

// Override Student / Lecturer access for devs
const overrideAccess = false;

// Fill in all pages here with relevant constraints
const restrictedPages = {
  "/": "login",
  "/about": "",
  "/display": "loginlecturer", 
  "/scan": "loginstudent",
  "/events": "login", // Eventually expand into different lecturer and student only paths
  "/login": "",
  "/reports": "loginlecturer", // Complete once lecturer functionality implemented
  "/scan": "login",
  "/settings:": "login",
};

function PathCheck(props) {
  // Check to only allow client side to run
  if (typeof window !== "undefined") {
    // Obtain page restraints
    var router = useRouter();
    var path = router.pathname;
    // Reduce paths into first identifier when
    if (path.includes("/reports")) {
      path = "/reports";
    } else if (path.includes("/display")) {
      path = "/display";
    } else if (path.includes("/events")) {
      path = "/events";
    }
    var constraints = restrictedPages[path];
    if (!constraints) {
      // Used to apply login to missing constraints, does not work since it is applied in a loop when redirecting.
      constraints = "";
    }
    // Obtain session values
    var { accounts } = useMsal();
    var oid = null;
    var login = false;
    if (accounts[0]) {
      oid = accounts[0].idTokenClaims.oid;
      login = true;
    }

    // Simple login check using accounts
    if (constraints.includes("login") && !login) {
      //Requires login and not logged in - redirect
      router.push("/login");
      return <div></div>;
    }

    // Get Key which tells PathStatusBlock the access level of page
    var key = null;
    if (constraints.includes("lecturer")) {
      key = "lecturer";
    } else if (constraints.includes("student")) {
      key = "student";
    }

    // Override if dev access
    if (overrideAccess) key = null;

    // FOR FUTURE : This can be changed to allow for varying student / lecture pages

    // Generate PathStatusBlock from Status request
    let generateBlock = (res) => {
      return (
        <PathStatusBlock status={res}>
          <div access={key}>{props.children}</div>
        </PathStatusBlock>
    );}

    

    // Assign return to a formatted request from DatabaseManager
    // Returned status object will be converted to appropriate PathStatusBlock above
    var status = <DatabaseManager req="status" slug={oid} then={generateBlock}/>;
  }

  return <div>{status}</div>;
}

export default PathCheck;

