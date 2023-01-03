import React, { Component } from "react";
import "./Footer.scss";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
class Footer extends Component {
  returnHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  render() {
    return (
      <>
        <div className="section-footer">
          <div class="row-footer">
            <div class="col-footer">
              <div className="header-logo" onClick={() => this.returnHome()}>
                <i class="fas fa-hospital"></i>
                HealthCare
              </div>
              <p>
                <FormattedMessage id="footer.content"></FormattedMessage>
              </p>
            </div>
            <div class="col-footer">
              <h3 className="link">
                <FormattedMessage id="footer.links"></FormattedMessage>
              </h3>
              <ul>
                <li>
                  <Link to="#">
                    <FormattedMessage id="footer.home"></FormattedMessage>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <FormattedMessage id="footer.about"></FormattedMessage>
                  </Link>
                </li>

                <li>
                  <Link to="#">
                    <FormattedMessage id="footer.service"></FormattedMessage>
                  </Link>
                </li>
              </ul>
            </div>
            <div class="col-footer">
              <h3>
                <FormattedMessage id="footer.follow"></FormattedMessage>
              </h3>
              <a href="https://www.facebook.com/">
                <i class="fab fa-facebook-f" id="facebook"></i>
              </a>
              <a href="https://twitter.com/">
                <i class="fab fa-twitter" id="twitter"></i>
              </a>
              <a href="https://www.youtube.com/">
                <i class="fab fa-youtube" id="youtube"></i>
              </a>
              <a href="https://www.instagram.com/">
                <i class="fab fa-instagram" id="instagram"></i>
              </a>
              <a href="https://www.twitch.tv/">
                <i class="fab fa-twitch" id="twitch"></i>
              </a>
              <a href="https://www.linkedin.com/">
                <i class="fab fa-linkedin" id="linkedin"></i>
              </a>
            </div>
            <div class="col-footer">
              <h3>
                <FormattedMessage id="footer.contact"></FormattedMessage>
              </h3>
              <p>
                <FormattedMessage id="footer.address"></FormattedMessage>: 590
                Cách mạng tháng 8, Quận 3, Hồ Chí Minh
              </p>
              <p>
                <FormattedMessage id="footer.phone"></FormattedMessage>:
                +84-0923497148
              </p>
              <p>Email: HealthCare@gmail.com</p>
            </div>
          </div>
          <hr />
          <p class="copyright">
            <FormattedMessage id="footer.copyright"></FormattedMessage>
          </p>
        </div>
      </>
    );
  }
}

export default withRouter(Footer);
