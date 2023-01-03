import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from "../../../services/userService";
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

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log("check specialty res: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        allSpecialty: res.data ? res.data : [],
      });
    }
  }

  componentDidUpdate() {}

  handleDetailDoctor = (item) => {
    console.log("Check detail specialty: ", item);
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  render() {
    let { allSpecialty } = this.state;

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
      <div className="section-medical">
        <div className="medical-content">
          <div className="medical-header">
            <span className="title-text">
              <FormattedMessage id="doctor.specialty"></FormattedMessage>
            </span>
            <button>
              <span className="xemthem">
                <FormattedMessage id="doctor.detail-more"></FormattedMessage>
              </span>
            </button>
          </div>
          <div className="medical-body">
            <Slider {...settings}>
              {allSpecialty &&
                allSpecialty.length > 0 &&
                allSpecialty.map((item, index) => {
                  return (
                    <div
                      className="img"
                      key={index}
                      onClick={() => this.handleDetailDoctor(item)}
                    >
                      <div
                        className="bg-img"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <p>{item.name}</p>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
