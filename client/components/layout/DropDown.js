import { slide as Menu } from 'react-burger-menu';
import classes from "./DropDown.module.css";

function DropDown() {
   
    return (
      <Menu right>
        <div className={classes.items}>
        <a id="home" className="menu-item" href="/">Home</a>
        <br></br>
        <br></br>
        <a id="about" className="menu-item" href="/about">About</a>
        <br></br>
        <br></br>
        <a id="home" className="menu-item" href="/settings">Settings</a>
        <br></br>
        <br></br>
        <a id="contact" className="menu-item" href="/login">Sign out</a>
        </div>
      </Menu>
    );
    
  }

  export default DropDown