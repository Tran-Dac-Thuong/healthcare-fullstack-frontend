import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGE } from "../../utils/constant";
import { getScheduleDate } from "../../services/userService";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDay: [],
      allAvailableTime: [],
      isModalOpen: false,
      dataScheduleTime: {},
    };
  }

  CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidMount() {
    let language = this.props.language;
    let allDays = this.getArrDay(language);
    if (this.props.doctorIdFromParent) {
      let res = await getScheduleDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );

      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }

    this.setState({
      allDay: allDays,
    });
  }

  getArrDay = (language) => {
    let arrDate = [];

    for (let index = 0; index < 7; index++) {
      let object = {};
      if (language === LANGUAGE.VI) {
        if (index === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(index, "days")
            .format("dddd - DD/MM");
          object.label = this.CapitalizeFirstLetter(labelVi);
        }
      } else {
        if (index === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(index, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }

      object.value = moment(new Date())
        .add(index, "days")
        .startOf("day")
        .valueOf();

      arrDate.push(object);
    }

    return arrDate;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDay(this.props.language);
      this.setState({
        allDay: allDays,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDay(this.props.language);

      let res = await getScheduleDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );

      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  HandleOnchangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDate(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
      console.log("check res schedule: ", res);
    }
  };

  HandleClickScheduleTime = (time) => {
    console.log("check time: ", time);
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      dataScheduleTime: time,
    });
  };

  HandleCloseModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  render() {
    let allDay = this.state.allDay;
    let allAvailableTime = this.state.allAvailableTime;
    let language = this.props.language;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.HandleOnchangeSelect(event)}>
              {allDay &&
                allDay.length > 0 &&
                allDay.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i class="fas fa-calendar-alt"></i>
              <span>
                <FormattedMessage id="patient.detail-doctor.schedule"></FormattedMessage>
              </span>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-btn-content">
                    {allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGE.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          key={index}
                          className={
                            language === LANGUAGE.VI ? "btn-vi" : "btn-en"
                          }
                          onClick={() => this.HandleClickScheduleTime(item)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>

                  <div className="free-select">
                    <FormattedMessage id="patient.detail-doctor.choose"></FormattedMessage>{" "}
                    <i class="far fa-hand-point-up"></i>{" "}
                    <FormattedMessage id="patient.detail-doctor.book-free"></FormattedMessage>
                  </div>
                </>
              ) : (
                <div className="not-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule"></FormattedMessage>
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isModalOpen={this.state.isModalOpen}
          HandleCloseModal={this.HandleCloseModal}
          dataScheduleTime={this.state.dataScheduleTime}
        ></BookingModal>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
