import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import Select from "react-select";
import * as action from "../../store/actions";
import { LANGUAGE } from "../../utils/constant";
import DatePicker from "../../components/Input/DatePicker";
import moment from "moment";
import { toast, Toast } from "react-toastify";
import _ from "lodash";
import { SaveBulkSchedule } from "../../services/userService";
import {
  getAllPatientForDoctor,
  PostSendRemedy,
} from "../../services/userService";
import RemedyModal from "../Doctor/Modal/RemedyModal";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  componentDidUpdate(prevProp, prevState, snapshot) {}

  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  HandleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      email: item.patientData.email,
      patientId: item.patientId,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  isCloseRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    let res = await PostSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      patientId: dataModal.patientId,
      doctorId: dataModal.doctorId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      toast.success("Send remedy succeed");
      this.isCloseRemedyModal();
      await this.getDataPatient();
    } else {
      toast.error("Send remedy fail!");
      console.log("check error send remedy: ", res);
    }
    console.log("check data modal: ", dataChild);
  };

  render() {
    console.log("check state dataPatient: ", this.state);
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="manage-patient-container">
          <div className="title mb-4">Manage Patient</div>
          <div className="manage-patient-body row container">
            <div className="col-6 form-group">
              <label>Chọn ngày khám</label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
              />
            </div>
            <div className="col-12 mt-5">
              <table>
                <tr>
                  <th>STT</th>
                  <th>Time</th>
                  <th>Fullname</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, index) => {
                    let time =
                      language === LANGUAGE.VI
                        ? item.timeTypeDataPatient.valueVi
                        : item.timeTypeDataPatient.valueEn;
                    let gender =
                      language === LANGUAGE.VI
                        ? item.patientData.genderData.valueVi
                        : item.patientData.genderData.valueEn;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{time}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{gender}</td>
                        <td>
                          <button
                            className="btn btn-success confirm"
                            onClick={() => this.HandleBtnConfirm(item)}
                          >
                            Confirm
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No data
                    </td>
                  </tr>
                )}
              </table>
            </div>
          </div>
        </div>
        <RemedyModal
          isOpenModal={isOpenRemedyModal}
          dataModal={dataModal}
          isCloseRemedyModal={this.isCloseRemedyModal}
          sendRemedy={this.sendRemedy}
        ></RemedyModal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchAllDoctorRedux: () => dispatch(action.FetchAllDoctors()),
    FetchAllScheduleTimeRedux: () => dispatch(action.FetchDoctorScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
