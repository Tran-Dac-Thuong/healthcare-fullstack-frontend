import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CommonUtils from "../../../utils/CommonUtils";
import * as action from "../../../store/actions";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi";
class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  HandleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  HandleOnchangeIMG = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  HandleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, isCloseRemedyModal, dataModal, sendRemedy } = this.props;

    return (
      <>
        <Modal
          isOpen={isOpenModal}
          centered
          size="lg"
          className={"remedy-modal-container"}
        >
          <div className="modal-header">
            <h5 className="modal-title">Successfully sent medical bill</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={isCloseRemedyModal}
            >
              <span aria-hidden="true">X</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>Patient email</label>
                <input
                  type="email"
                  value={this.state.email}
                  className="form-control"
                  onChange={(event) => this.HandleOnchangeEmail(event)}
                />
              </div>
              <div className="col-6 form-group">
                <label>Choose file</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => this.HandleOnchangeIMG(event)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.HandleSendRemedy()}>
              Send
            </Button>{" "}
            <Button color="secondary" onClick={isCloseRemedyModal}>
              Cancel
            </Button>
          </ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
