import React, { Component } from "react";
import LOGO from './img/logo-main.png';
import LOGOR from './img/ant-logo.png';
import { withRouter } from './withrouter';
import {ResetPassword} from "./apiserver";
import Config from "./Config";

class Forget extends Component {
    constructor(props) {
        super(props);
        this.submitPassword = this.submitPassword.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            _id: "",
            password1: "",
            password2: "",
        }
    }
    

    submitPassword(e) {
        e.preventDefault()
        if(this.state.password1 !== this.state.password2) {
            alert("password mismatched");
            return;
        }

        const params = {
          userId:localStorage.getItem("_id"),
          password: this.state.password1,
        };
        ResetPassword(params, (res) => {
          localStorage.setItem("Password", res.data.password);
          this.props.router.navigate('/')
        }, ()=> {})
      }

      handlePassword (e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        })
      }
    render() {
    return(
        <div className="container-fluid bg-log">
        <div className="header d-flex align-center">
          <img className='ctrl-wi' src={LOGO} alt="logo-main" />
          <img src={LOGOR} alt="logo-main" />
        </div>

        <div className="container">
        <div className="card lg-c mt-5">
            <form>
            <h3>Forget Password</h3>
              <h6>Please enter your New Password</h6>
              <div className="mb-3">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter New Password"
                  name='password1'
                  value={this.state.password1}
                  onChange={this.handlePassword}
                />
              </div>
              <div className="mb-3">
                <label>Re-Enter Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-Enter Password"
                  name='password2'
                  value={this.state.password2}
                  onChange={this.handlePassword}
                />
              </div>
              <div className="d-grid">
                <a type="submit" className="btn btn-primary" href={`${Config.BaseURL}resetPassword`} onClick={this.submitPassword}>
                  Submit
                </a>
                {/* <Snackbar open={this.state.AlertOpen} autoHideDuration={3000} onClose={this.handleAlertClose} anchorOrigin={{ vertical:"bottom", horizontal:"right" }}>
            <Alert onClose={this.handleAlertClose} severity="error" sx={{ width: '100%' }}>
             {this.state.AlertMsg}
            </Alert>
      </Snackbar> */}
              </div>
            </form>
          </div>
        </div>
    </div>
    )
}
}
export default withRouter(Forget)
