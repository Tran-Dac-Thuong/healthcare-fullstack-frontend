import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllcodeService } from "../../services/userService";
import { CRUD_ACTIONS, LANGUAGE } from "../../utils/constant";
import CommonUtils from "../../utils/CommonUtils";
import * as action from "../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableUser from "./TableUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImg: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
      address: "",
      Gender: "",
      Position: "",
      roleId: "",
      avatar: "",
      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   let res = await getAllcodeService("gender");
    //   this.setState({
    //     genderArr: res.data,
    //   });
    //   console.log("Check res: ", res);
    // } catch (error) {
    //   console.log(error);
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        Gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        Position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.listuser !== this.props.listuser) {
      let arrGender = this.props.genderRedux;
      let arrPosition = this.props.positionRedux;
      let arrRole = this.props.roleRedux;
      this.setState({
        previewImg: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        address: "",
        Gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        Position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  UploadIMG = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log(base64);
      let ObjectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: ObjectUrl,
        avatar: base64,
      });
    }
  };

  OpenImg = () => {
    if (!this.state.previewImg) return;
    this.setState({
      isOpen: true,
    });
  };

  HandleInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  CheckValid = () => {
    let arrCheck = [
      "email",
      "password",
      "firstname",
      "lastname",
      "phonenumber",
      "address",
    ];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert(arrCheck[i] + " is required");
        break;
      }
    }
    return isValid;
  };

  HandleSubmit = () => {
    let valid = this.CheckValid();
    if (valid === false) return;

    let action = this.state.action;
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux action
      this.props.CreateNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.Gender,
        roleId: this.state.roleId,
        positionId: this.state.Position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.EditUser({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.Gender,
        roleId: this.state.roleId,
        positionId: this.state.Position,
        avatar: this.state.avatar,
      });
    }

    //console.log("Check submit: ", this.state);
  };

  HandleEditUserForm = (user) => {
    let Imgbase64 = "";
    if (user.image) {
      Imgbase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "Hardcode",
      firstname: user.firstName,
      lastname: user.lastName,
      address: user.address,
      phonenumber: user.phonenumber,
      Gender: user.gender,
      roleId: user.roleId,
      Position: user.positionId,
      avatar: "",
      previewImg: Imgbase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let gender = this.state.genderArr;
    let position = this.state.positionArr;
    let role = this.state.roleArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoading;

    let {
      email,
      password,
      firstname,
      lastname,
      phonenumber,
      address,
      Gender,
      Position,
      roleId,
    } = this.state;

    //console.log("Check gender redux: ", this.props.genderRedux);
    //console.log("check loading: ", isLoadingGender);
    return (
      <>
        <div className="user-redux-container mb-5">
          <div className="title">User Redux</div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="form-group col-12 mb-3 mt-3">
                  <FormattedMessage id="manage-user.add" />
                </div>
                <div className="form-group col-12">
                  {isLoadingGender === true ? "Loading..." : " "}
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                    onChange={(event) => this.HandleInput(event, "email")}
                  />
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                    value={password}
                    onChange={(event) => this.HandleInput(event, "password")}
                  />
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="manage-user.firstname" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstname}
                    onChange={(event) => this.HandleInput(event, "firstname")}
                  />
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="manage-user.lastname" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastname}
                    onChange={(event) => this.HandleInput(event, "lastname")}
                  />
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="manage-user.phonenumber" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phonenumber}
                    onChange={(event) => this.HandleInput(event, "phonenumber")}
                  />
                </div>
                <div className="form-group col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(event) => this.HandleInput(event, "address")}
                  />
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    class="form-control"
                    value={Gender}
                    onChange={(event) => this.HandleInput(event, "Gender")}
                  >
                    {gender &&
                      gender.length > 0 &&
                      gender.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    class="form-control"
                    value={Position}
                    onChange={(event) => this.HandleInput(event, "Position")}
                  >
                    {position &&
                      position.length > 0 &&
                      position.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="manage-user.roleId" />
                  </label>
                  <select
                    class="form-control"
                    value={roleId}
                    onChange={(event) => this.HandleInput(event, "roleId")}
                  >
                    {role &&
                      role.length > 0 &&
                      role.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(event) => this.UploadIMG(event)}
                    />
                    <div
                      className="preview-img"
                      style={{
                        backgroundImage: `url(${this.state.previewImg})`,
                      }}
                      onClick={() => this.OpenImg()}
                    ></div>
                  </div>
                </div>

                <div className="form-group col-12 mt-4">
                  <button
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={() => this.HandleSubmit()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.save" />
                    ) : (
                      <FormattedMessage id="manage-user.create" />
                    )}
                  </button>
                </div>
                <div className="col-12 mt-3">
                  <TableUser
                    HandleEditUserForm={this.HandleEditUserForm}
                    action={this.state.action}
                  ></TableUser>
                </div>
              </div>
            </div>
          </div>
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImg}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoading: state.admin.isLoading,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    listuser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(action.fetchGenderStart()),
    getPositionStart: () => dispatch(action.fetchPositionStart()),
    getRoleStart: () => dispatch(action.fetchRoleStart()),
    CreateNewUser: (data) => dispatch(action.CreateNewUser(data)),
    FetchUserRedux: () => dispatch(action.FetchAllUserStart()),
    EditUser: (data) => dispatch(action.EditUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
