import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import * as action from "../../store/actions";
import HomeHeader from "../Home/HomeHeader";
import { getDetailDoctor } from "../../services/userService";
import { LANGUAGE } from "../../utils/constant";
import Footer from "../Home/Section/Footer";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailDoctor(id);
      this.setState({
        currentDoctorId: id,
      });
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
      console.log("check detail res: ", res);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    console.log(this.props.match.params.id);
    let { detailDoctor } = this.state;
    let nameVi = "",
      nameEn = "";
    let { language } = this.props;
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }
    return (
      <>
        {" "}
        <HomeHeader isShowBanner={false}></HomeHeader>
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGE.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule
                doctorIdFromParent={this.state.currentDoctorId}
              ></DoctorSchedule>
            </div>
            <div className="content-right">
              <DoctorExtraInfo
                doctorIdFromParent={this.state.currentDoctorId}
              ></DoctorExtraInfo>
            </div>
          </div>
          <div className="detail-intro-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <Footer></Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
