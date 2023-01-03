import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUser,
  createNewUser,
  deleteUser,
  editUser,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModal: false,
      isEditModal: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let res = await getAllUser("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUser: res.users,
      });
    }
    console.log("Get all user ", res);
  };
  OpenModal = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  CloseModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  CloseEditModal = () => {
    this.setState({
      isEditModal: !this.state.isEditModal,
    });
  };

  CreateUser = async (data) => {
    try {
      let response = await createNewUser(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModal: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    console.log(data);
  };

  HandleDeleteUser = async (userId) => {
    try {
      let res = await deleteUser(userId.id);
      if (res && res.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  HandleEditUser = (user) => {
    this.setState({
      isEditModal: true,
      userEdit: user,
    });
    // console.log(user);
  };

  EditUser = async (user) => {
    try {
      let res = await editUser(user);
      if (res && res.errCode === 0) {
        this.setState({
          isEditModal: false,
        });
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          CloseModal={this.CloseModal}
          CreateUser={this.CreateUser}
        ></ModalUser>
        {this.state.isEditModal && (
          <ModalEditUser
            isOpen={this.state.isEditModal}
            CloseModal={this.CloseEditModal}
            currentUser={this.state.userEdit}
            EditUser={this.EditUser}
          ></ModalEditUser>
        )}
        <div className="title text-center">Manage users</div>
        <div className="add mt-3 mx-4">
          <button
            type="button"
            className="btn btn-primary px-3"
            onClick={() => this.OpenModal()}
          >
            <i className="fas fa-plus"></i>Add new user
          </button>
        </div>
        <div className="user-table mt-3 mx-4">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {arrUser &&
                arrUser.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.HandleEditUser(item)}
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.HandleDeleteUser(item)}
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
