import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import * as action from "../../store/actions";
import { LANGUAGE } from "../../utils/constant";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import CommonUtils from "../../utils/CommonUtils";
import { createNewClinic } from "../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProp, prevState, snapshot) {
    if (prevProp.language !== this.props.language) {
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState(
      {
        descriptionMarkdown: text,
        descriptionHTML: html,
      },
      () => {
        console.log("handleEditorChange", html, text);
      }
    );
  };

  UploadIMG = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log(base64);

      this.setState({
        imageBase64: base64,
      });
    }
  };

  HandleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  HandleSaveClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create new clinic succeed!");
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Create new clinic fail!");
      console.log(res);
    }
  };

  render() {
    return (
      <>
        <div className="manage-specialty-container container">
          <div className="title">Manage Clinic</div>

          <div className="markdown-specialty row">
            <div className="col-6 form-group mt-4">
              <label>Name</label>
              <input
                type="text"
                value={this.state.name}
                className="form-control"
                placeholder="Enter name..."
                onChange={(event) => this.HandleOnchangeInput(event, "name")}
              />
            </div>
            <div className="col-6 form-group mt-4">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => this.UploadIMG(event)}
              />
            </div>
            <div className="col-6 form-group mt-4">
              <label>Address</label>
              <input
                type="text"
                value={this.state.address}
                className="form-control"
                placeholder="Enter address..."
                onChange={(event) => this.HandleOnchangeInput(event, "address")}
              />
            </div>

            <div className="mt-4 mb-4">
              {" "}
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
          </div>
          <div
            className="btn btn-primary mb-4"
            onClick={() => this.HandleSaveClinic()}
          >
            Save Info
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
