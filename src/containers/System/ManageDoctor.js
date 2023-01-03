import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import { emitter } from "../../utils/emitter";
import * as action from "../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGE, CRUD_ACTIONS } from "../../utils/constant";
import { getDetailDoctor } from "../../services/userService";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctor: [],
      hasOldData: false,
      //save doctor info
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedSpecialty: "",
      selectedClinic: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      specialtyId: "",
      clinicId: "",
    };
  }

  componentDidMount() {
    this.props.FetchAllDoctorRedux();
    this.props.getRequiredDoctorRedux();
  }

  handleSelectDoctorArr = (inputData, type) => {
    let resault = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;
          object.label = language === LANGUAGE.VI ? labelVi : labelEn;
          object.value = item.id;
          resault.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGE.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          resault.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGE.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          resault.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          resault.push(object);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          resault.push(object);
        });
      }
    }
    return resault;
  };

  componentDidUpdate(prevProp, prevState, snapshot) {
    if (prevProp.AllDoctors !== this.props.AllDoctors) {
      let dataSelect = this.handleSelectDoctorArr(
        this.props.AllDoctors,
        "USERS"
      );
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProp.language !== this.props.language) {
      let dataSelect = this.handleSelectDoctorArr(
        this.props.AllDoctors,
        "USERS"
      );
      let { resPayment, resPrice, resProvince } =
        this.props.AllRequiredDoctorRedux;

      let dataSelectPrice = this.handleSelectDoctorArr(resPrice, "PRICE");
      let dataSelectPayment = this.handleSelectDoctorArr(resPayment, "PAYMENT");
      let dataSelectProvince = this.handleSelectDoctorArr(
        resProvince,
        "PROVINCE"
      );

      this.setState({
        listDoctor: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProp.AllRequiredDoctorRedux !== this.props.AllRequiredDoctorRedux) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.AllRequiredDoctorRedux;

      let dataSelectPrice = this.handleSelectDoctorArr(resPrice, "PRICE");
      let dataSelectPayment = this.handleSelectDoctorArr(resPayment, "PAYMENT");
      let dataSelectProvince = this.handleSelectDoctorArr(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.handleSelectDoctorArr(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.handleSelectDoctorArr(resClinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState(
      {
        contentMarkdown: text,
        contentHTML: html,
      },
      () => {
        console.log("handleEditorChange", html, text);
      }
    );
  };

  handleSaveInfo = () => {
    let { hasOldData } = this.state;

    this.props.SaveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialtyId: this.state.selectedSpecialty.value,

      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
    console.log("check doctor redux: ", this.state);
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });

    // let { listPrice, listPayment, listProvince, listSpecialty } = this.state;
    // let res = await getDetailDoctor(selectedOption.value);
    // if (res && res.errCode === 0 && res.data && res.data.Markdown) {
    //   let markdown = res.data.Markdown;

    //   let addressClinic = "";
    //   let nameClinic = "";
    //   let note = "";
    //   let paymentId = "";
    //   let provinceId = "";
    //   let priceId = "";
    //   let selectedPrice = "";
    //   let selectedPayment = "";
    //   let selectedProvince = "";
    //   let selectedSpecialty = "";
    //   let specialtyId = "";

    //   if (res.data.Doctor_Info) {
    //     addressClinic = res.data.Doctor_Info.addressClinic;
    //     nameClinic = res.data.Doctor_Info.nameClinic;
    //     note = res.data.Doctor_Info.note;
    //     paymentId = res.data.Doctor_Info.paymentId;
    //     priceId = res.data.Doctor_Info.priceId;
    //     provinceId = res.data.Doctor_Info.provinceId;
    //     specialtyId = res.data.Doctor_Info.specialtyId;

    //     selectedPayment = listPayment.find((item) => {
    //       return item && item.value === paymentId;
    //     });
    //     selectedPrice = listPrice.find((item) => {
    //       return item && item.value === priceId;
    //     });
    //     selectedProvince = listProvince.find((item) => {
    //       return item && item.value === provinceId;
    //     });
    //     selectedSpecialty = listSpecialty.find((item) => {
    //       return item && item.value === specialtyId;
    //     });
    //   }

    //   this.setState({
    //     contentHTML: markdown.contentHTML,
    //     contentMarkdown: markdown.contentMarkdown,
    //     description: markdown.description,
    //     hasOldData: true,
    //     addressClinic: addressClinic,
    //     nameClinic: nameClinic,
    //     note: note,
    //     selectedPayment: selectedPayment,
    //     selectedPrice: selectedPrice,
    //     selectedProvince: selectedProvince,
    //     selectedSpecialty: selectedSpecialty,
    //   });
    // } else {
    //   this.setState({
    //     contentHTML: "",
    //     contentMarkdown: "",
    //     description: "",
    //     addressClinic: "",
    //     nameClinic: "",
    //     note: "",
    //     hasOldData: false,
    //     selectedPayment: "",
    //     selectedPrice: "",
    //     selectedProvince: "",
    //     selectedSpecialty: "",
    //   });
    // }
  };

  HandleOnchangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  HandleChangeSelectDoctorInfo = (selectedOption, name) => {
    let stateName = name.name;
    let copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    this.setState({
      ...copyState,
    });
    console.log("check onchange select: ", selectedOption, stateName);
  };

  render() {
    let { hasOldData } = this.state;
    // console.log("Check doctor: ", this.state);
    return (
      <>
        <div className="container">
          {" "}
          <div className="title mb-5">
            <FormattedMessage id="manage-doctor.title" />
          </div>
          <div className="more-info">
            <div className="content-left form-group">
              <label>
                <FormattedMessage id="manage-doctor.select-doctor" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.listDoctor}
                className="form-control"
                placeholder={
                  <FormattedMessage id="manage-doctor.select-doctor" />
                }
              />
            </div>
            <div className="content-right form-group">
              <label>
                <FormattedMessage id="manage-doctor.doctor-infomation" />
              </label>
              <textarea
                className="form-control"
                rows="5"
                value={this.state.description}
                onChange={(event) =>
                  this.HandleOnchangeText(event, "description")
                }
              ></textarea>
            </div>
          </div>
          <div className="more-info-extra row mb-5">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="manage-doctor.price" />
              </label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.HandleChangeSelectDoctorInfo}
                options={this.state.listPrice}
                className="form-control"
                placeholder={<FormattedMessage id="manage-doctor.price" />}
                name="selectedPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="manage-doctor.payment" />
              </label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.HandleChangeSelectDoctorInfo}
                options={this.state.listPayment}
                className="form-control"
                placeholder={<FormattedMessage id="manage-doctor.payment" />}
                name="selectedPayment"
              />
            </div>
            <div className="col-4 form-group mb-4">
              <label>
                <FormattedMessage id="manage-doctor.province" />
              </label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.HandleChangeSelectDoctorInfo}
                options={this.state.listProvince}
                className="form-control"
                placeholder={<FormattedMessage id="manage-doctor.province" />}
                name="selectedProvince"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="manage-doctor.name-clinic" />
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.nameClinic}
                onChange={(event) =>
                  this.HandleOnchangeText(event, "nameClinic")
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="manage-doctor.address-clinic" />
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.addressClinic}
                onChange={(event) =>
                  this.HandleOnchangeText(event, "addressClinic")
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="manage-doctor.note" />
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.note}
                onChange={(event) => this.HandleOnchangeText(event, "note")}
              />
            </div>
            <div className="col-4 form-group mt-4">
              <label>
                <FormattedMessage id="manage-doctor.specialty" />
              </label>
              <Select
                value={this.state.selectedSpecialty}
                onChange={this.HandleChangeSelectDoctorInfo}
                options={this.state.listSpecialty}
                className="form-control"
                placeholder={<FormattedMessage id="manage-doctor.specialty" />}
                name="selectedSpecialty"
              />
            </div>
            <div className="col-4 form-group mt-4">
              <label>
                <FormattedMessage id="manage-doctor.clinic" />
              </label>
              <Select
                value={this.state.selectedClinic}
                onChange={this.HandleChangeSelectDoctorInfo}
                options={this.state.listClinic}
                className="form-control"
                placeholder={<FormattedMessage id="manage-doctor.clinic" />}
                name="selectedClinic"
              />
            </div>
          </div>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
          <button
            className={
              hasOldData === true
                ? "btn btn-warning mt-4 mb-4"
                : "btn btn-primary mt-4 mb-4"
            }
            onClick={() => this.handleSaveInfo()}
          >
            {hasOldData === true ? (
              <span>Save Info</span>
            ) : (
              <span>Create Info</span>
            )}
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listuser: state.admin.users,
    language: state.app.language,
    AllDoctors: state.admin.AllDoctors,
    AllRequiredDoctorRedux: state.admin.AllRequiredDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SaveDetailDoctorRedux: (data) => dispatch(action.SaveDetailDoctor(data)),
    FetchAllDoctorRedux: () => dispatch(action.FetchAllDoctors()),
    getRequiredDoctorRedux: () => dispatch(action.getRequiredDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
