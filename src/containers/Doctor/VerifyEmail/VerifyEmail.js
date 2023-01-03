import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./VerifyEmail.scss";
import { VerifyEmailBooking } from "../../../services/userService";
import HomeHeader from "../../Home/HomeHeader";
import * as action from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await VerifyEmailBooking({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader></HomeHeader>
        <div className="confirm-message">
          {statusVerify === false ? (
            <div>Loading data</div>
          ) : (
            <div>
              {errCode === 0 ? (
                <div>Xác nhận lịch hẹn thành công</div>
              ) : (
                <div>Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
