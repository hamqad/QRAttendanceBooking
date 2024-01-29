// Displays ReportItems as a sorted list

import React, { useState, useRef } from "react";
import ReportItem from "./ReportItem";
import ReportEvent from "./ReportEvent";
import ReportModule from "./ReportModule";
import ReportStudent from "./ReportStudent";
import classes from "./ReportList.module.css";

//import DatabaseManager from

// EVENT: report_type, title, module_code, event_type, event_date, event_start, penalty, db_id
// MODULE: report_type, title, module_code, module_year, db_id
// STUDENT: report_type, first_name, last_name, username, university_code, module_list, acedemic_year, db_id

// Different available sorts for types:
const sortTypes = {
  events: {
    searches: ["title", "module_code", "event_type"],
    orders: ["event_date", "title", "module_code"],
  },
  modules: {
    searches: ["module_code", "title"],
    orders: ["module_code", "title", "module_year"],
  },
  students: {
    searches: ["first_name", "username", "university_code"], // "module_list" to-be implemented
    orders: ["last_name"],
  },
};

// Infomation on orders
const sortOrders = {
  event_date: { id: "event_date", disp: "Date", def: "event_start", comp: compDate },
  last_name: { id: "last_name", disp: "Name", def: "first_name", comp: compString },
  module_code: { id: "module_code", disp: "Module ID", def: "event_date", comp: compString },
  first_name: { id: "first_name", disp: "Name", comp: compString },
  event_start: { id: "event_start", disp: "Time", comp: compString },
  title: { id: "title", disp: "Title", comp: compString },
  module_year: { id: "module_year", disp: "Year", def: "title", comp: compInteger },
};

// Infomation on searches
const sortSearches = {
  last_name: { id: "last_name", disp: "Student Name" },
  module_code: { id: "module_code", disp: "Module ID" },
  module_list: { id: "module_list", disp: "Student Modules" }, // to-be implemented
  first_name: { id: "first_name", disp: "Student Name", def: "last_name" },
  university_code: { id: "university_code", disp: "Student ID" },
  title: { id: "title", disp: "Title" },
  event_type: { id: "event_type", disp: "Event Type" },
  username: { id: "username", disp: "Student Username" },
};

// Comparison Functions
function compString(a, b) {
  return a.localeCompare(b);
}
function compInteger(a, b) {
  return a - b;
}
function compDate(a, b) {
  // "dd/mm/yy"
  let d = (a) => a.substring(0, 2);
  let m = (a) => a.substring(3, 5);
  let y = (a) => a.substring(6, 8);
  // Get comp values
  let cd = compString(d(a), d(b));
  let cm = compString(m(a), m(b));
  let cy = compString(y(a), y(b));
  // Return priority total
  if (cy) return cy;
  if (cm) return cm;
  return cd;
}

function ReportList(props) {
  // States to update list on sort
  var reportType = props.type // Shouldn't be mixed results
  const initFlag = useRef(false);
  const [searchField, setSearchField] = useState(
    sortTypes[reportType].searches[0]
  );
  const [searchValue, setSearchValue] = useState("");
  const [orderField, setOrderField] = useState(sortTypes[reportType].orders[0]);

  // Functions to handle sort changes
  const searchBarHandle = (e) => {
    setSearchValue(e.target.value);
  };
  const searchByHandle = (e) => {
    setSearchField(e.target.value);
  };
  const orderByHandle = (e) => {
    setOrderField(e.target.value);
  };

  // Values created only on initial setup
  const reportItems = useRef([]);
  const searchBy = useRef(null);
  const searchBar = useRef(null);
  const orderBy = useRef(null);

  // Data initialisation
  if (!initFlag.current) {
    // List of Reports
    reportItems.current = [];
    props.reports.forEach((report) => {
      // Check type and create appropriate Item
      var item = null;
      switch (report.report_type) {
        case "events":
          item = <ReportEvent key={report.db_id} report={report} />;
          break;
        case "modules":
          item = <ReportModule key={report.db_id} report={report} />;
          break;
        case "students":
          item = <ReportStudent key={report.db_id} report={report} />;
          break;
        default:
          item = <ReportItem key={report.db_id} report={report} />;
      }

      reportItems.current.push(item);
    });

    // Retrieve Options for Searches
    var searchOptions = [];
    sortTypes[reportType].searches.forEach((s) => {
      let disp = sortSearches[s].disp;
      let html = (
        <option key={s} value={s}>
          {disp}
        </option>
      );
      searchOptions.push(html);
    });

    // Retrieve Options for Orders
    var orderOptions = [];
    sortTypes[reportType].orders.forEach((o) => {
      let disp = sortOrders[o].disp;
      let html = (
        <option key={o} value={o}>
          {disp}
        </option>
      );
      orderOptions.push(html);
    });

    // Create search / order html
    searchBy.current = (
      <select onChange={searchByHandle} className={classes.searchBy}>
        {searchOptions}
      </select>
    );
    searchBar.current = (
      <input
        onChange={searchBarHandle}
        type="text"
        className={classes.searchBar}
      ></input>
    );
    orderBy.current = (
      <select
        onChange={orderByHandle}
        defaultValue={sortTypes[reportType].def}
        className={classes.orderBy}
      >
        {orderOptions}
      </select>
    );

    // Initial data created, set flag
    initFlag.current = true;
  }

  // Generate new list based of init reference
  let cleanReports = [];

  // Omit reports not containing search term in search field
  let recOmit = (search, item) => {
    let field = item.props.report[sortSearches[search].id];
    if (field.toLowerCase().includes(searchValue.toLowerCase()))
      cleanReports.push(item); // Add item if contains search data
    else if (sortSearches[search].def)
      recOmit(sortSearches[search].def, item); // Check default field for search data
  };
  reportItems.current.map((item) => {
    // For each item, search it at search field
    recOmit(searchField, item);
  });

  // Sort remaining using sorting functions
  let localField = orderField;
  let compWrap = (a, b) => {
    let comparison = sortOrders[localField].comp;
    let v = comparison(a.props.report[localField], b.props.report[localField]);
    if (v) return v;
    // If 0 check for def sort order
    let def = sortOrders[localField].def;
    if (def) {
      // Recursivley call compWrap if def value
      localField = def;
      return compWrap(a, b);
    }
    // No remaining def value, return 0
    localField = orderField;
    return 0;
  };
  cleanReports.sort(compWrap);

  //Sort the List
  // reportItems.sort((a, b) =>
  //   a.props.report.title.localeCompare(b.props.report.title)
  // );

  return (
    <>
      <h1></h1>
      <div className={classes.orderDiv}>
        Order Reports by:
        {orderBy.current}
      </div>
      <div className={classes.searchDiv}>
        Search Reports by:
        {searchBy.current}
        {searchBar.current}
      </div>
      <div className={classes.container}>
        <ul className={classes.itemlist}>
          {cleanReports.map((item) => (
            <li key={item.key}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ReportList;
