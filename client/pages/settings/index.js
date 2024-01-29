// domain/settings/
// Settings page for user

import React from "react";
import classes from "./settings.module.css";

if (typeof window !== 'undefined') {
  var darkMode = localStorage.getItem("darkmode");
}

class Settings extends React.Component {
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleDark() {
    if (darkMode == "false") {
      document.getElementsByTagName("body")[0].style.background = "#1e1e1e";
      document.getElementsByTagName("body")[0].style.color = "white";
      document.getElementsByTagName("header")[0].style.background = "#121212";
      document.getElementsByClassName("bm-menu")[0].style.background = "#1e1e1e";
      document.getElementsByClassName("bm-item-list")[0].style.color = "white";
      darkMode = "true";
      localStorage.setItem("darkmode", "true");
    } else if (darkMode == "true") {
      document.getElementsByTagName("body")[0].style.background = "white";
      document.getElementsByTagName("body")[0].style.color = "black";
      document.getElementsByTagName("header")[0].style.background = "#f8f8f8";
      document.getElementsByClassName("bm-menu")[0].style.background = "#f8f8f8";
      document.getElementsByClassName("bm-item-list")[0].style.color = "black";
      darkMode = "false";
      localStorage.setItem("darkmode", "false");
    }
  }

  isDark(){
    if (darkMode == "false") {
    return false;
    } else if (darkMode == "true") {
      return true;
  }
}

  render() {
    return (
      <div className={classes.settings}>
        <div className={classes.topitem}>
          <p className={classes.text}>Dark Mode</p>
          <label className={classes.switch}>
            <input
              id="darkSwitch"
              className={classes.toggle}
              onChange={this.toggleDark}
              defaultChecked = {this.isDark()}
              type="checkbox"
            />
            <span className={classes.slider}></span>
          </label>
        </div>
      </div>
    );
  }
}

export default Settings;
