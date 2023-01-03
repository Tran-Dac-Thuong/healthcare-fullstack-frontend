import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./About.scss";
class About extends Component {
  render() {
    return (
      <div className="section-about">
        <div className="section-header">
          <FormattedMessage id="patient.healthy.important"></FormattedMessage>
        </div>
        <div className="section-content">
          <div className="content-left">
            <iframe
              width="570"
              height="320"
              src="https://www.youtube.com/embed/Cg_GW7yhq20"
              title="Healthy Lifestyle"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p className="text">
              <FormattedMessage id="long-text"></FormattedMessage>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
