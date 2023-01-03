import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGE } from "../../utils/constant";
import { getScheduleDate } from "../../services/userService";
import { getExtraInfoDoctor } from "../../services/userService";
import { NumericFormat } from "react-number-format";
//var NumberFormat = require("react-number-format");
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHideShow: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInfoDoctor(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInfoDoctor(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  HandleHideShow = () => {
    this.setState({
      isHideShow: !this.state.isHideShow,
    });
  };

  render() {
    let isHideShow = this.state.isHideShow;
    let extraInfo = this.state.extraInfo;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage id="patient.extra-info-doctor.text-address"></FormattedMessage>
            </div>
            <div className="name-clinic">
              {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
            </div>
            <div className="detail-address-clinic">
              {extraInfo && extraInfo.addressClinic
                ? extraInfo.addressClinic
                : ""}
            </div>
          </div>
          <div className="content-down">
            {isHideShow === true ? (
              <>
                <div>
                  <FormattedMessage id="patient.extra-info-doctor.price"></FormattedMessage>
                  :{" "}
                  <span>
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGE.VI && (
                        <NumericFormat
                          value={extraInfo.priceTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VND"}
                        />
                      )}

                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGE.EN && (
                        <NumericFormat
                          value={extraInfo.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                  </span>
                  <br />
                  <span className="note">
                    {extraInfo && extraInfo.note ? extraInfo.note : ""}
                  </span>
                </div>

                <div className="pay">
                  <FormattedMessage id="patient.extra-info-doctor.payment"></FormattedMessage>{" "}
                  {extraInfo &&
                  extraInfo.paymentTypeData &&
                  language === LANGUAGE.VI
                    ? extraInfo.paymentTypeData.valueVi
                    : ""}
                  {extraInfo &&
                  extraInfo.paymentTypeData &&
                  language === LANGUAGE.EN
                    ? extraInfo.paymentTypeData.valueEn
                    : ""}
                </div>
                <br />
                <div className="more" onClick={() => this.HandleHideShow()}>
                  <FormattedMessage id="patient.extra-info-doctor.hide-price"></FormattedMessage>
                </div>
              </>
            ) : (
              <div>
                <FormattedMessage id="patient.extra-info-doctor.price"></FormattedMessage>
                :{" "}
                <span className="price">
                  {extraInfo &&
                    extraInfo.priceTypeData &&
                    language === LANGUAGE.VI && (
                      <NumericFormat
                        value={extraInfo.priceTypeData.valueVi}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    )}

                  {extraInfo &&
                    extraInfo.priceTypeData &&
                    language === LANGUAGE.EN && (
                      <NumericFormat
                        value={extraInfo.priceTypeData.valueEn}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    )}
                </span>
                .
                <span className="more" onClick={() => this.HandleHideShow()}>
                  <FormattedMessage id="patient.extra-info-doctor.detail"></FormattedMessage>
                </span>
              </div>
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
