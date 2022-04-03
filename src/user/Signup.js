import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";
import SocialLogin from "./SocialLogin";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false,
      recaptcha: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  recapchaHandler = (e) => {
    this.setState({ error: "" });
    let userDay = e.target.value.toLowerCase();
    let dayCount;

    if (userDay === "sunday") {
      dayCount = 0;
    } else if (userDay === "monday") {
      dayCount = 1;
    } else if (userDay === "tuesday") {
      dayCount = 2;
    } else if (userDay === "wednesday") {
      dayCount = 3;
    } else if (userDay === "thursday") {
      dayCount = 4;
    } else if (userDay === "friday") {
      dayCount = 5;
    } else if (userDay === "saturday") {
      dayCount = 6;
    }

    if (dayCount === new Date().getDay()) {
      this.setState({ recaptcha: true });
      return true;
    } else {
      this.setState({
        recaptcha: false,
      });
      return false;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };
    // console.log(user);
    if (this.state.recaptcha) {
      signup(user).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            error: "",
            name: "",
            email: "",
            password: "",
            open: true,
          });
        }
      });
    } else {
      this.setState({
        error: "What day is today? Please write a correct answer!",
      });
    }
  };

  signupForm = (name, email, password, recaptcha) => (
    <form>
      <div className="form-group">
        <label htmlFor="name" className="text-muted">
          Name
        </label>
        <input
          onChange={this.handleChange("name")}
          value={name}
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="text-muted">
          Email
        </label>
        <input
          onChange={this.handleChange("email")}
          value={email}
          type="email"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="text-muted">
          Password
        </label>
        <input
          onChange={this.handleChange("password")}
          value={password}
          type="password"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="recaptcha" className="text-muted">
          {recaptcha ? "Thanks. You got it!" : "What day is today?"}
        </label>
        <input
          onChange={this.recapchaHandler}
          type="text"
          className="form-control"
        />
      </div>

      <button
        onClick={this.handleSubmit}
        className="btn btn-raised btn-primary"
      >
        Submit
      </button>
    </form>
  );

  render() {
    const { name, email, password, error, open, recaptcha } = this.state;
    return (
      <div className="container">
        <h2 className="mt5 mb-5">Signup</h2>

        <hr />
        <SocialLogin />

        <hr />
        <br />

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          New account is successfully created. Please{" "}
          <Link to="/signin">Sign In</Link>
        </div>
        {this.signupForm(name, email, password, recaptcha)}
      </div>
    );
  }
}

export default Signup;
