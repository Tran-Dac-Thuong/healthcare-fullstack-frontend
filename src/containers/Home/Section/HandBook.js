import React, { Component } from "react";
import { connect } from "react-redux";
import "./HandBook.scss";
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

class HandBook extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="section-handbook">
        <div className="handbook-content">
          <div className="handbook-header">
            <span className="title-text">
              <FormattedMessage id="handbook"></FormattedMessage>
            </span>
            <button>
              <span className="xemthem">
                <FormattedMessage id="post"></FormattedMessage>
              </span>
            </button>
          </div>
          <div className="handbook-body">
            <Slider {...settings}>
              <div className="img-customize">
                {" "}
                <div className="img">
                  <div className="bg-img-01"></div>
                  <div className="bg-title">
                    {" "}
                    <p>
                      <FormattedMessage id="total"></FormattedMessage>
                    </p>
                  </div>
                </div>
              </div>

              <div className="img-customize">
                {" "}
                <div className="img">
                  <div className="bg-img-02"></div>
                  <div className="bg-title">
                    {" "}
                    <p>
                      <FormattedMessage id="total"></FormattedMessage>
                    </p>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                {" "}
                <div className="img">
                  <div className="bg-img-03"></div>
                  <div className="bg-title">
                    {" "}
                    <p>
                      <FormattedMessage id="total"></FormattedMessage>
                    </p>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                {" "}
                <div className="img">
                  <div className="bg-img-04"></div>
                  <div className="bg-title">
                    {" "}
                    <p>
                      <FormattedMessage id="total"></FormattedMessage>
                    </p>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
