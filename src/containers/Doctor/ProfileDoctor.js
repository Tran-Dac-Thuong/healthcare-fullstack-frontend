import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGE } from "../../utils/constant";
import { getProfileDoctor } from "../../services/userService";
import { NumericFormat } from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
import localization from "moment/locale/vi";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInfoDoctor = async (id) => {
    let resault = {};
    if (id) {
      let res = await getProfileDoctor(id);
      if (res && res.errCode === 0) {
        resault = res.profileData;
      }
    }
    return resault;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    // if (this.props.doctorId !== prevProps.doctorId) {
    //   this.getInfoDoctor(this.props.doctorId);
    // }
  }

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    //console.log("check inside datatime: ", dataTime);
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGE.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGE.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {date}
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let nameVi = "",
      nameEn = "";
    let {
      language,
      dataTime,
      isShowHideDescription,
      isShowPrice,
      isShowDetail,
      doctorId,
    } = this.props;
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    return (
      //console.log("check props datatime: ", dataTime),
      <>
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  dataProfile && dataProfile.image ? dataProfile.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGE.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {isShowHideDescription === true ? (
                  <>
                    {dataProfile &&
                      dataProfile.Markdown &&
                      dataProfile.Markdown.description && (
                        <span>{dataProfile.Markdown.description}</span>
                      )}
                  </>
                ) : (
                  <>{this.renderTimeBooking(dataTime)}</>
                )}
              </div>
            </div>
          </div>
          {isShowDetail === true && (
            <div className="more">
              <Link to={`/detail/${doctorId}`}>Xem thêm</Link>
            </div>
          )}
          {isShowPrice && (
            <div className="price">
              <FormattedMessage id="patient.booking-modal.price"></FormattedMessage>{" "}
              {dataProfile &&
              dataProfile.Doctor_Info &&
              language === LANGUAGE.VI ? (
                <NumericFormat
                  value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VND"}
                />
              ) : (
                ""
              )}
              {dataProfile &&
              dataProfile.Doctor_Info &&
              language === LANGUAGE.EN ? (
                <NumericFormat
                  value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"$"}
                />
              ) : (
                ""
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
