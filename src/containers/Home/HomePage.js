import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import About from "./Section/About";
import Doctor from "./Section/Doctor";
import Footer from "./Section/Footer";
import HandBook from "./Section/HandBook";
import MedicalFacility from "./Section/MedicalFacility";
import Specialty from "./Section/Specialty";
import TelemedicineViaVideo from "./Section/Telemedicine-via-Video";
class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader isShowBanner={true}></HomeHeader>
        <Specialty></Specialty>
        <MedicalFacility></MedicalFacility>
        <TelemedicineViaVideo></TelemedicineViaVideo>
        <Doctor></Doctor>
        <HandBook></HandBook>
        <About></About>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
