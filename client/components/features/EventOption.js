// Used in events/create to give a single option for an event's details

import { Component } from "react";
import classes from "./EventOption.module.css";

const INTYPES = ["date", "time", "text"];

class EventOption extends Component {
  // Constructor retrieves parameters
  constructor(props) {
    super();
    this.name = props.param.name;
    this.input = props.param.input;
    this.values = props.param.values;
    this.dbvalues = props.param.dbvalues;   // A DBM query to retrieve values
    this.optionID = props.param.optionID;
    this.init = props.init;
    this.changeHandle = props.changeHandle;
  }

 

  render() {
    // Prepare input
    var input_component = <></>;

    const wrapHandle = (e) => {
      this.changeHandle(e, this.optionID);
    };

    if (this.input == "dropdown") {
      let opts = [];
      if(this.dbvalues) {
        // If dropdown with dbvalues
        opts = this.dbvalues;
      } else {
        // If dropdown, make select with options
        this.values.forEach((opt, index) => {
          opts.push(<option key={index}>{opt}</option>);
        });
      }
      // If init value given, set that as default
      if(this.init)
        input_component = <select onChange={wrapHandle} defaultValue={this.init}>{opts}</select>;
      else
      input_component = <select onChange={wrapHandle}>{opts}</select>;
    } else if (INTYPES.includes(this.input)) {
      // If valid input, set as input type
      // If init value given, set that as default
      if(this.init)
        input_component = <input type={this.input} onChange={wrapHandle} defaultValue={this.init}></input>;
      else
        input_component = <input type={this.input} onChange={wrapHandle}></input>;
    }

    return (
      <div className={classes.container}>
        <div className={classes.name}>
          <a>{this.name}</a>
        </div>
        <div className={classes.input}>{input_component}</div>
      </div>
    );
  }
}

export default EventOption;
