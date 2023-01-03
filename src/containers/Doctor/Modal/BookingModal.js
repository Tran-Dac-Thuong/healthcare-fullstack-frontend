import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _, { times } from "lodash";
import DatePicker from "../../../components/Input/DatePicker";
import * as action from "../../../store/actions";
import { LANGUAGE } from "../../../utils";
import Select from "react-select";
import { PostPatientAppointment } from "../../../services/userService";
import { toast, Toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      phonenumber: "",
      address: "",
      email: "",
      reason: "",
      dayOfbirth: "",
      selectedGender: "",
      doctorId: "",
      gender: "",
      timeType: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderRedux();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        gender: this.BuildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        gender: this.BuildDataGender(this.props.genders),
      });
    }
    if (this.props.dataScheduleTime !== prevProps.dataScheduleTime) {
      if (
        this.props.dataScheduleTime &&
        !_.isEmpty(this.props.dataScheduleTime)
      ) {
        let doctorId = this.props.dataScheduleTime.doctorId;
        let timeType = this.props.dataScheduleTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  BuildDataGender = (data) => {
    let resault = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let obj = {};
        obj.label = language === LANGUAGE.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        resault.push(obj);
      });
    }
    return resault;
  };

  HandleOnchangeModal = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      dayOfbirth: date[0],
    });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  HandleConfirm = async () => {
    let date = new Date(this.state.dayOfbirth).getTime();
    let timeString = this.buildTimeBooking(this.props.dataScheduleTime);
    let doctorName = this.buildDoctorName(this.props.dataScheduleTime);
    let res = await PostPatientAppointment({
      fullname: this.state.fullname,
      phonenumber: this.state.phonenumber,
      address: this.state.address,
      email: this.state.email,
      date: this.props.dataScheduleTime.date,
      birthday: date,
      reason: this.state.reason,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("Successful appointment booking");
      this.props.HandleCloseModal();
    } else {
      toast.error("Appointment failed!");
    }
  };

  buildTimeBooking = (dataTime) => {
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
      return `${time} - ${date}`;
    }
    return "";
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    //console.log("check inside datatime: ", dataTime);
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGE.VI
          ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
          : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
      return name;
    }
    return "";
  };

  render() {
    let { isModalOpen, HandleCloseModal, dataScheduleTime } = this.props;
    let doctorId = "";

    if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
      doctorId = dataScheduleTime.doctorId;
    }
    console.log("Check state modal: ", this.state);
    return (
      <>
        <Modal
          isOpen={isModalOpen}
          centered
          size="lg"
          className={"booking-modal-container"}
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="title">
                <FormattedMessage id="patient.booking-modal.title"></FormattedMessage>
              </span>
              <span onClick={HandleCloseModal}>
                <i class="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-info">
                <ProfileDoctor
                  doctorId={doctorId}
                  dataTime={dataScheduleTime}
                  isShowHideDescription={false}
                  isShowDetail={false}
                  isShowPrice={true}
                ></ProfileDoctor>
              </div>
              {/* <div className="price">Giá khám 250.000đ</div> */}
              <div className="row">
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.fullname"></FormattedMessage>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.fullname}
                    onChange={(event) =>
                      this.HandleOnchangeModal(event, "fullname")
                    }
                  />
                </div>
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.phone-number"></FormattedMessage>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.phonenumber}
                    onChange={(event) =>
                      this.HandleOnchangeModal(event, "phonenumber")
                    }
                  />
                </div>
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.address"></FormattedMessage>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) =>
                      this.HandleOnchangeModal(event, "address")
                    }
                  />
                </div>
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.email"></FormattedMessage>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) =>
                      this.HandleOnchangeModal(event, "email")
                    }
                  />
                </div>
                <div className="col-12 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.reason"></FormattedMessage>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.HandleOnchangeModal(event, "reason")
                    }
                  />
                </div>
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.date"></FormattedMessage>
                  </label>
                  <DatePicker
                    onChange={this.handleOnchangeDatePicker}
                    className="form-control"
                    value={this.state.dayOfbirth}
                  />
                </div>
                <div className="col-6 form-group mt-3">
                  <label>
                    <FormattedMessage id="patient.booking-modal.gender"></FormattedMessage>
                  </label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChange}
                    options={this.state.gender}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button className="confirm" onClick={() => this.HandleConfirm()}>
                <FormattedMessage id="patient.booking-modal.confirm"></FormattedMessage>
              </button>
              <button className="cancel" onClick={HandleCloseModal}>
                <FormattedMessage id="patient.booking-modal.cancel"></FormattedMessage>
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderRedux: () => dispatch(action.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
