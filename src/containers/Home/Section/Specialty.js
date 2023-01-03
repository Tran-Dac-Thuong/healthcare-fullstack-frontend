import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allClinic: [],
    };
  }
  componentDidMount() {}

  render() {
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
      <div className="section-specialty">
        <div className="specialty-content">
          <div className="specialty-header">
            <span className="title-text">
              <FormattedMessage id="telemedicine.Telemedicine-via-Video"></FormattedMessage>
            </span>
            <button>
              <span className="xemthem">
                <FormattedMessage id="doctor.detail-more"></FormattedMessage>
              </span>
            </button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              <div className="img">
                <div className="bg-img-1"></div>
                <p>Tư vấn, trị liệu tam lý từ xa</p>
              </div>
              <div className="img">
                <div className="bg-img-2"></div>
                <p>Tư vấn, trị liệu tam lý từ xa</p>
              </div>
              <div className="img">
                <div className="bg-img-3"></div>
                <p>Tư vấn, trị liệu tam lý từ xa</p>
              </div>
              <div className="img">
                <div className="bg-img-4"></div>
                <p>Tư vấn, trị liệu tam lý từ xa</p>
              </div>
              <div className="img">
                <div className="bg-img-5"></div>
                <p>Tư vấn, trị liệu tam lý từ xa</p>
              </div>
              <div className="img">
                <div className="bg-img-6"></div>
                <p>Tư vấn, trị liệu tam lý từ xa</p>
              </div>
              <div className="img">
                <div className="bg-img-7"></div>
                <p>Tư vấn, trị liệu tam lý từ xa</p>
              </div>
              <div className="img">
                <div className="bg-img-8"></div>
                <p>Tư vấn, trị liệu tam lý từ xa</p>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
