import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { HandleLoginAPI } from "../../services/userService";
//import { userLoginSuccess } from "../../store/actions/userActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowHidePassword: false,
      errMessage: "",
    };
  }

  HandleUserLogin = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      let data = await HandleLoginAPI(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Login Successfully");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  HandleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  HandleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  HandleHideShowPassword = () => {
    this.setState({
      isShowHidePassword: !this.state.isShowHidePassword,
    });
  };

  HandleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.HandleUserLogin();
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={this.state.username}
                onChange={(event) => this.HandleOnchangeUsername(event)}
              />
            </div>
            <div className="col-12 login-input">
              <label>Password</label>
              <div className="custom-login-password">
                <input
                  type={this.state.isShowHidePassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={(event) => this.HandleOnchangePassword(event)}
                  onKeyDown={(event) => this.HandleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.HandleHideShowPassword();
                  }}
                >
                  <i
                    class={
                      this.state.isShowHidePassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn-login"
                onClick={() => this.HandleUserLogin()}
              >
                Login
              </button>
            </div>
            <div className="col-12 forgot-password">
              <a href="#">Forgot password?</a>
            </div>
            <div className="col-12 text-other-login">
              <span>Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
              <i className="fab fa-twitter twitter"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
