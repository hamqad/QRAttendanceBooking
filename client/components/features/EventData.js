// Single Item of event lists containing event info

import React from "react";
import classes from "./EventData.module.css";


class EventData extends React.Component {

  //Obtain info from props
    constructor(props){
      super();
      // All data available.
      // Some may be undefined depending on Axios request
      this.attending = props.param.attending;
      this.event_date = props.param.event_date.substring(0,10);
      this.event_end = props.param.event_end;
      this.db_id = props.param.event_id;
      this.event_start = props.param.event_start;
      this.event_title = props.param.event_title;
      this.event_type = props.param.event_type;
      this.lecturer_id = props.param.lecturer_id;
      this.location_id = props.param.location_id;
      this.building_name = props.param.building_name;
      this.location_id = props.param.location_id;
      this.room_name = props.param.room_name;
      this.module_code = props.param.module_code;
      this.capacity = props.param.capacity;
      this.penalty = props.param.penalty;
    }
  //Layout Info inside here
  render(){
    return (
      <div>
        <br></br>
        <br></br>
        <fieldset className={classes.fieldset}>
          <legend>{this.event_title}</legend>
          <div className={classes.container}>
            <div className={classes.name}>
              <a>Module</a>
            </div>
            <div className={classes.input}><input defaultValue={this.module_code} disabled></input></div>
          </div>
          <div className={classes.container}>
            <div className={classes.name}>
              <a>Type</a>
            </div>
            <div className={classes.input}><input defaultValue={this.event_type} disabled></input></div>
          </div>
          <div className={classes.container}>
            <div className={classes.name}>
              <a>Date</a>
            </div>
            <div className={classes.input}><input type="date" defaultValue={this.event_date} disabled></input></div>
          </div>
          <div className={classes.container}>
            <div className={classes.name}>
              <a>Time</a>
            </div>
            <div className={classes.input}><input type="time" value={this.event_start} disabled></input></div>
          </div>
          <div className={classes.container}>
            <div className={classes.name}>
              <a>Location</a>
            </div>
            <div className={classes.input}><input defaultValue={this.building_name +" "+ this.room_name} disabled></input></div>
          </div>
          <div className={classes.container}>
            <div className={classes.name}>
              <a>Capacity</a>
            </div>
            <div className={classes.input}><input defaultValue={this.attending+"/"+this.capacity} disabled></input></div>
          </div>
          <div className={classes.container}>
            <div className={classes.name}>
              <a>Penalty Rate</a>
            </div>
            <div className={classes.input}><input defaultValue={this.penalty} disabled></input></div>
          </div>
          <div className={classes.container}>
            <div className={classes.name}>
              <a>QR Code Type</a>
            </div>
            <div className={classes.input}><input defaultValue="temp" disabled></input></div>
          </div>
      </fieldset>
    </div>
    )
  }
};

export default EventData;