// Layout for homepage Buttons

import classes from "./HomepageButtons.module.css";

function HomepageButtons(props) {
  return (
    <>
      <div className={classes.container}>{props.children}</div>
    </>
  );
}

export default HomepageButtons;
