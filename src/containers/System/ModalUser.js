import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
    };
    this.listenEmitter();
  }

  listenEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        address: "",
      });
    });
  }

  componentDidMount() {}

  toggle = () => {
    this.props.CloseModal();
  };

  HandleOnchange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  CheckInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstname", "lastname", "address"];
    for (var i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing input " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  HandleAddUser = () => {
    let validate = this.CheckInput();
    if (validate === true) {
      this.props.CreateUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className="modaluser"
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
        <ModalBody>
          <div className="modal-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                onChange={(event) => this.HandleOnchange(event, "email")}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => this.HandleOnchange(event, "password")}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>Firstname</label>
              <input
                type="text"
                placeholder="firstname"
                onChange={(event) => this.HandleOnchange(event, "firstname")}
                value={this.state.firstname}
              />
            </div>
            <div className="input-container">
              <label>Lastname</label>
              <input
                type="text"
                placeholder="lastname"
                onChange={(event) => this.HandleOnchange(event, "lastname")}
                value={this.state.lastname}
              />
            </div>
            <div className="input-container max-width">
              <label>Address</label>
              <input
                type="text"
                placeholder="address"
                onChange={(event) => this.HandleOnchange(event, "address")}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.HandleAddUser()}
          >
            Add new
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
