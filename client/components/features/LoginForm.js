import React from "react";
import classes from "./LoginForm.module.css";

class LoginForm extends React.Component {
    state = {
        email: '',
        password: ''
    };


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = event => {
        const {email,password} = this.state;
        event.preventDefault();
        if((email == "psyjd1@nottingham.ac.uk") && (password == "password")){
            alert("Hello!");
            window.location.href = "/";
        }else{
            alert("Wrong Email or Password! Try again.");
        }
        
    }

    render() {
        return (
            <div>
                <img 
                className={classes.logo}
                src="https://www.nottingham.ac.uk/brand/images/uon-single-col-logo-blue-rgb.png"></img>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                    <div ><input className={classes.input} type="email"
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                    />
                    </div>
                    <div><input className={classes.input} type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                    />
                    </div>
                        <button className={classes.submit} type="submit">Login</button>
                </form>
            </div>
        )

    }
}

export default LoginForm;