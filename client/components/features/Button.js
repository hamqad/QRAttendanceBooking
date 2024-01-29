// Button used all over the website

//import Link from "next/link";
import classes from "./Button.module.css";

function Button(props) {
  const name = props.param.name;
  const link = props.param.link;
  const action = props.param.action;

  if(props.param.locked) {
    // Locked version
    return (
      <a>
        <button className={classes.locked}>
          <div className={classes.content}>{name}</div>
        </button>
      </a>
    );

  } else {
    // Unlocked version
    return (
      <a href={link}>
        <button className={classes.button} onClick={action}>
          <div className={classes.content}>{name}</div>
        </button>
      </a>
    );
  }

  
}



export default Button;
