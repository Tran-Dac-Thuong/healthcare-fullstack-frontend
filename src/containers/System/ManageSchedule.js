import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as action from "../../store/actions";
import { LANGUAGE } from "../../utils/constant";
import DatePicker from "../../components/Input/DatePicker";
import moment from "moment";
import { toast, Toast } from "react-toastify";
import _ from "lodash";
import { SaveBulkSchedule } from "../../services/userService";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.FetchAllDoctorRedux();
    this.props.FetchAllScheduleTimeRedux();
  }

  componentDidUpdate(prevProp, prevState, snapshot) {
    if (prevProp.AllDoctors !== this.props.AllDoctors) {
      let dataSelect = this.handleSelectDoctorArr(this.props.AllDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProp.AllScheduleTime !== this.props.AllScheduleTime) {
      let data = this.props.AllScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
    // if (prevProp.language !== this.props.language) {
    //   let dataSelect = this.handleSelectDoctorArr(this.props.AllDoctors);
    //   this.setState({
    //     listDoctor: dataSelect,
    //   });
    // }
  }

  handleSelectDoctorArr = (inputData) => {
    let resault = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.firstName} ${item.lastName}`;
        let labelEn = `${item.lastName} ${item.firstName}`;
        object.label = language === LANGUAGE.VI ? labelVi : labelEn;
        object.value = item.id;
        resault.push(object);
      });
    }
    return resault;
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  HandleClickTime = (time) => {
    let rangeTime = this.state.rangeTime;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime &&
        rangeTime.map((item) => {
          if (item.id === time.id) {
            item.isSelected = !item.isSelected;
            return item;
          }
        });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  HandleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let resault = [];

    if (!currentDate) {
      toast.error("Date is required");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Doctor is required");
      return;
    }

    let formattedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = schedule.keyMap;
          resault.push(object);
        });
      } else {
        toast.error("Please select the time");
        return;
      }
    }
    let res = await SaveBulkSchedule({
      arrSchedule: resault,
      doctorId: selectedDoctor.value,
      formattedDate: formattedDate,
    });

    if (res && res.errCode === 0) {
      toast.success("Save info succeed");
    } else {
      toast.error("save info fail");
      console.log("Check error res bulk create: ", res);
    }
  };

  render() {
    let rangeTime = this.state.rangeTime;
    let language = this.props.language;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <React.Fragment>
        <div className="manage-schedule-container">
          <div className="title">
            <FormattedMessage id="manage-schedule.manage-doctor-schedule"></FormattedMessage>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctor}
              />
            </div>
            <div className="col-6">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "pick-time active"
                          : "pick-time"
                      }
                      key={index}
                      onClick={() => this.HandleClickTime(item)}
                    >
                      {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => this.HandleSaveSchedule()}
          >
            <FormattedMessage id="manage-schedule.save-change" />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    AllDoctors: state.admin.AllDoctors,
    language: state.app.language,
    AllScheduleTime: state.admin.AllScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchAllDoctorRedux: () => dispatch(action.FetchAllDoctors()),
    FetchAllScheduleTimeRedux: () => dispatch(action.FetchDoctorScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
