import React, { Component } from "react";
import { connect } from "react-redux";
import "./Doctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
import { withRouter } from "react-router";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.DoctorRedux !== this.props.DoctorRedux) {
      this.setState({
        arrDoctor: this.props.DoctorRedux,
      });
    }
  }

  async componentDidMount() {
    this.props.FetchLoadingDoctor();
  }

  handleDetailDoctor = (doctor) => {
    console.log("Check detail: ", doctor);
    this.props.history.push(`/detail/${doctor.id}`);
  };

  render() {
    let doctor = this.state.arrDoctor;

    let language = this.props.language;

    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    return (
      <div className="section-doctor">
        <div className="doctor-content">
          <div className="doctor-header">
            <span className="title-text">
              <FormattedMessage id="doctor.out-standing-doctor"></FormattedMessage>
            </span>
            <button>
              <span className="xemthem">
                <FormattedMessage id="doctor.more-info"></FormattedMessage>
              </span>
            </button>
          </div>
          <div className="doctor-body">
            <Slider {...settings}>
              {doctor &&
                doctor.length > 0 &&
                doctor.map((item, index) => {
                  // if (index == 0) {
                  //   console.log("check item: ", item);
                  // }
                  let Imgbase64 = "";
                  if (item.image) {
                    Imgbase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="img-customize"
                      key={index}
                      onClick={() => this.handleDetailDoctor(item)}
                    >
                      {" "}
                      <div className="img">
                        <div
                          className="bg-img"
                          style={{ backgroundImage: `url(${Imgbase64})` }}
                        ></div>
                        <p>{language === LANGUAGE.VI ? nameVi : nameEn}</p>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
          <div className="bottom"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    DoctorRedux: state.admin.doctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchLoadingDoctor: () => dispatch(actions.FetchLoadingDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
