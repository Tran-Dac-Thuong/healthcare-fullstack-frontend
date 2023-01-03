import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/bookingcare.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../utils/constant";
import { changelanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";
class HomeHeader extends Component {
  Changelanguage = (language) => {
    this.props.changelanguageAppRedux(language);
  };

  returnHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  render() {
    let language = this.props.language;
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              {/* <i className="fas fa-bars"></i> */}
              <div className="header-logo" onClick={() => this.returnHome()}>
                <i class="fas fa-hospital"></i>
                HealthCare
                {/* <img className="header-logo" src={logo} /> */}
              </div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.select-good-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>{" "}
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGE.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.Changelanguage(LANGUAGE.VI)}>VN</span>
              </div>
              <span>|</span>
              <div
                className={
                  language === LANGUAGE.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.Changelanguage(LANGUAGE.EN)}>EN</span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title-1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title-2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search" />
              </div>
            </div>
            <div className="content-down">
              <div className="option">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-stethoscope"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-ambulance"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital-symbol"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-syringe"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child7" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child8" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-notes-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child9" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changelanguageAppRedux: (language) => dispatch(changelanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
