// Top Bar featured at the top of every page
// Allows for Navigation

import Link from "next/link";
import classes from "./TopBar.module.css";
import DropDown from "./DropDown";

function TopBar() {
  return (
    <div>
      <header className={classes.header}>
        <a href="/" className={classes.logolink}>
          <img src="/uonlogo.png" className={classes.logo}></img>
        </a>
      </header>
      <DropDown />
    </div>
  );
}

export default TopBar;
