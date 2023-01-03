import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableUser.scss";
import { emitter } from "../../utils/emitter";
import * as action from "../../store/actions";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }
  componentDidMount() {
    this.props.FetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listuser !== this.props.listuser) {
      this.setState({
        userRedux: this.props.listuser,
      });
    }
  }

  HandleDeleteUserRedux = (userDelete) => {
    this.props.DeleteUserRedux(userDelete.id);
  };

  HandleEditUserRedux = (userEdit) => {
    this.props.HandleEditUserForm(userEdit);
  };
  render() {
    console.log("check list user: ", this.props.listuser);
    let arrUser = this.state.userRedux;
    return (
      <>
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
              arrUser.length > 0 &&
              arrUser.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.HandleEditUserRedux(item)}
                      >
                        <i class="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.HandleDeleteUserRedux(item)}
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listuser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchUserRedux: () => dispatch(action.FetchAllUserStart()),
    DeleteUserRedux: (id) => dispatch(action.DeleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
