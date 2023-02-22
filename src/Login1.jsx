import React, { Component } from "react";
import SignIn from "./SignIn";
import { withRouter } from "./withrouter";
import { login } from "./apiserver";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LOGO from "./img/logo-main.png";
import LOG from "./img/login-img.png";

import LOGOR from "./img/ant-logo.png";
import LOGLOGO from "./img/login-img.png";
import { LogoDevOutlined } from "@mui/icons-material";
import Config from "./Config";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleAlertClose = this.handleAlertClose(this);
    this.state = {
      Email: "",
      Password: "",
      AlertOpen: false,
      AlertMsg: "",
    };
  }

  handleLogin(e) {
    e.preventDefault();

    // debugger;
    const emailRegex = /^[\w.]+@([\w-]+\.)+[\w-]+$/;
    if (!this.state.Email.match(emailRegex)) {
      this.setState({
        AlertOpen: true,
        AlertMsg: "Invalid Email Id",
      });
      return false;
    }
    const params = {
      userEmail: this.state.Email,
      password: this.state.Password,
    };
    login(
      params,
      (res) => {
        localStorage.setItem("userEmail", res.type.data.userEmail);
        localStorage.setItem("userName", res.type.data.userName);
        localStorage.setItem("userType", res.type.data.userType);
        localStorage.setItem("UserTypeId", res.type.data.UserTypeId);
        localStorage.setItem("_id", res.type.data._id);
        localStorage.setItem("firstLogin", res.type.data.firstLogin);
        if (res.type.data.firstLogin) {
          this.props.router.navigate("/Forgetpassword");
        } else if (res.type.data.userType === "Manager") {
          this.props.router.navigate("/managerDashBoard");
        } else if (res.type.data.userType === "PT User") {
          this.props.router.navigate("/ptDashboard");
        } else {
          this.props.router.navigate("/list");
        }
      },
      () => { }
    );
  }

  handleSignUp(e) {
    e.preventDefault();
    // debugger;
    this.props.router.navigate("/sign-up");
  }
  onChangeInput(e) {
    // debugger;
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleAlertClose() {
    this.setState({
      AlertOpen: false,
    });
  }

  render() {
    return (
      <div className="container-fluid bg-log">
        <div className="header d-flex align-center">
          <img className="ctrl-wi" src={LOGO} alt="logo-main" />
          <img src={LOGOR} alt="logo-main" />
        </div>
        <div className="container fg-custom">

          <div className="row align-center">
            <div className="col-lg-6">
              <img className="lg-left" src={LOG} alt="logo-main" />
            </div>
            <div className="col-lg-6">
              <div className="card lg-c">
                <form>
                  <h3>SignIn</h3>
                  <h6>Please enter your details</h6>
                  <div className="mb-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      name="Email"
                      className="form-control"
                      placeholder="Type Here"
                      value={this.state.Email}
                      onChange={this.onChangeInput}
                    />
                  </div>
                  <div className="mb-2">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="Password"
                      placeholder="Type Here"
                      value={this.state.Password}
                      onChange={this.onChangeInput}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="custom-control custom-checkbox">
                      <div className="ckbx">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="fpass">
                        <a href="">Forgot Password?</a>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid">
                    <a
                      type="submit"
                      className="btn btn-primary"
                      href={Config.BaseURL + "login"}
                      onClick={this.handleLogin}
                    >
                      Login
                    </a>
                    {/* <Snackbar open={this.state.AlertOpen} autoHideDuration={3000} onClose={this.handleAlertClose} anchorOrigin={{ vertical:"bottom", horizontal:"right" }}>
            <Alert onClose={this.handleAlertClose} severity="error" sx={{ width: '100%' }}>
             {this.state.AlertMsg}
            </Alert>
      </Snackbar> */}
                  </div>
                  {/* <p className="forgot-password text-right">
           <a href="/Forgetpassword">Forget password?</a><br></br> */}
                  {/* <button type="button" className="btn btn-primary action-button" onClick={this.handleSignUp}>Sign Up</button> */}
                  {/* </p> */}
                </form>


                <p>©2022 <span><a style={{ color: '#0078FF', textDecoration: 'none' }} href="">antlabs.com</a></span> All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
