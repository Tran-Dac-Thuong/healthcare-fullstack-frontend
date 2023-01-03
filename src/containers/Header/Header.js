import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGE, USER_ROLE } from "../../utils";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  HandleChangeLanguage = (language) => {
    this.props.changelanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];

    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      this.setState({
        menuApp: menu,
      });
    }
    console.log("check user info: ", this.props.userInfo);
  }

  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="header-language-logout">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />,{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
          </span>
          <span className="language">
            <span
              className={
                language === LANGUAGE.VI ? "language-vi active" : "language-vi"
              }
              onClick={() => this.HandleChangeLanguage(LANGUAGE.VI)}
            >
              VN
            </span>
            <span>|</span>
            <span
              className={
                language === LANGUAGE.EN ? "language-en active" : "language-vi"
              }
              onClick={() => this.HandleChangeLanguage(LANGUAGE.EN)}
            >
              EN
            </span>
          </span>

          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
        {/* nút logout */}
        {/* <div className="btn btn-logout" onClick={processLogout} title="Log out">
          <i className="fas fa-sign-out-alt"></i>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changelanguageAppRedux: (language) =>
      dispatch(actions.changelanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
