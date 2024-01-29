// Contains account name, pfp, username

import classes from "./AccountIcon.module.css";

function AccountIcon(props) {
  const name = props.param.name;
  const icon = props.param.icon;
  const user = props.param.user;

  return (
    <div className={classes.container}>
      <p className={classes.text}>{name}</p>
      <img className={classes.icon} src={icon}></img>
      <p className={classes.text}>{user}</p>
    </div>
  );
}

export default AccountIcon;
