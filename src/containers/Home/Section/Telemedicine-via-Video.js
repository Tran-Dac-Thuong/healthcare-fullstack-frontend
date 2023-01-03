import React, { Component } from "react";
import { connect } from "react-redux";
import "./Telemedicine-via-Video.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from "../../../services/userService";
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

class Telemedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allClinic: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    console.log("check res clinic: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        allClinic: res.data ? res.data : "",
      });
    }
  }

  HandleDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  render() {
    let { allClinic } = this.state;

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
      <div className="section-video">
        <div className="video-content">
          <div className="video-header">
            <span className="title-text">
              <FormattedMessage id="Outstanding-medical-facility.medical"></FormattedMessage>
            </span>
            <button>
              <span className="xemthem">
                {" "}
                <FormattedMessage id="doctor.detail-more"></FormattedMessage>
              </span>
            </button>
          </div>
          <div className="video-body">
            <Slider {...settings}>
              {allClinic &&
                allClinic.length > 0 &&
                allClinic.map((item, index) => {
                  return (
                    <>
                      <div
                        className="img"
                        key={index}
                        onClick={() => this.HandleDetailClinic(item)}
                      >
                        <div
                          className="bg-img"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <p>{item.name}</p>
                      </div>
                    </>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Telemedicine)
);
