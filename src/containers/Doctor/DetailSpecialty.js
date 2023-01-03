import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import * as action from "../../store/actions";
import { LANGUAGE } from "../../utils/constant";
import HomeHeader from "../Home/HomeHeader";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "./ProfileDoctor";
import Footer from "../Home/Section/Footer";
import {
  getDetailSpecialtyById,
  getDetailDoctor,
  getAllcodeService,
} from "../../services/userService";
import _ from "lodash";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvinceSpeciaty: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyById({
        id: id,
        location: "ALL",
      });
      let resProvince = await getAllcodeService("PROVINCE");

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueVi: "Toàn quốc",
            valueEn: "ALL",
          });
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvinceSpeciaty: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  componentDidUpdate(prevProp, prevState, snapshot) {}

  handleOnchangeSelect = async (event) => {
    console.log("check select province: ", event.target.value);
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;
      let res = await getDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvinceSpeciaty } = this.state;
    let { language } = this.props;
    return (
      <div className="detail-specialty-container">
        <HomeHeader></HomeHeader>
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="select-doctor-province">
            <select onChange={(event) => this.handleOnchangeSelect(event)}>
              {listProvinceSpeciaty &&
                listProvinceSpeciaty.length > 0 &&
                listProvinceSpeciaty.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDetail={true}
                        isShowPrice={false}
                        //dataTime={dataScheduleTime}
                        isShowHideDescription={true}
                      ></ProfileDoctor>
                    </div>
                  </div>
                  <div className="dt-content-right">
                    {" "}
                    <div className="doctor-schedule">
                      <DoctorSchedule
                        doctorIdFromParent={item}
                      ></DoctorSchedule>
                    </div>
                    <div className="doctor-extra-info">
                      <DoctorExtraInfo
                        doctorIdFromParent={item}
                      ></DoctorExtraInfo>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Footer></Footer>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
