import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import * as action from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
import HomeHeader from "../../Home/HomeHeader";
import DoctorExtraInfo from "../DoctorExtraInfo";
import DoctorSchedule from "../DoctorSchedule";
import ProfileDoctor from "../ProfileDoctor";
import Footer from "../../Home/Section/Footer";
import { getDetailClinicById } from "../../../services/userService";
import _ from "lodash";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  componentDidUpdate(prevProp, prevState, snapshot) {}

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;
    return (
      <div className="detail-specialty-container">
        <HomeHeader></HomeHeader>
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <div className="mb-3 name-clinic">{dataDetailClinic.name}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                ></div>
              </>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
