import actionTypes from "../actions/actionTypes";

const initialState = {
  // isLoggedIn: false,
  // adminInfo: null
  isLoading: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  doctors: [],
  AllDoctors: [],
  AllScheduleTime: [],
  AllRequiredDoctor: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.ADMIN_LOGIN_SUCCESS:
    //     return {
    //         ...state,
    //         isLoggedIn: true,
    //         adminInfo: action.adminInfo
    //     }
    // case actionTypes.ADMIN_LOGIN_FAIL:
    //     return {
    //         ...state,
    //         isLoggedIn: false,
    //         adminInfo: null
    //     }
    // case actionTypes.PROCESS_LOGOUT:
    //     return {
    //         ...state,
    //         isLoggedIn: false,
    //         adminInfo: null
    //     }
    case actionTypes.FETCH_GENDER_START:
      let copyStateStart = { ...state };
      copyStateStart.isLoading = true;
      console.log("check gender start: ", action);
      return {
        ...copyStateStart,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyStateSuccess = { ...state };
      copyStateSuccess.genders = action.data;
      copyStateSuccess.isLoading = false;
      console.log("check gender success: ", action);

      return {
        ...copyStateSuccess,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      let copyStateFail = { ...state };
      copyStateFail.isLoading = false;
      copyStateFail.genders = [];
      console.log("check gender fail: ", action);
      return {
        ...copyStateFail,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      let copyStateSuccessPosition = { ...state };
      copyStateSuccessPosition.positions = action.data;
      // copyStateSuccessPosition.isLoading = false;
      console.log("check position success: ", action);

      return {
        ...copyStateSuccessPosition,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      let copyStateFailPosition = { ...state };
      //copyStateFailPosition.isLoading = false;
      copyStateFailPosition.positions = [];
      console.log("check position fail: ", action);
      return {
        ...copyStateFailPosition,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      let copyStateSuccessRole = { ...state };
      copyStateSuccessRole.roles = action.data;
      //copyStateSuccess.isLoading = false;
      console.log("check role success: ", action);

      return {
        ...copyStateSuccessRole,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      let copyStateFailRole = { ...state };
      //copyStateFailRole.isLoading = false;
      copyStateFailRole.roles = [];
      console.log("check role fail: ", action);
      return {
        ...copyStateFailRole,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      let copyStateSuccessUser = { ...state };
      copyStateSuccessUser.users = action.userData;
      console.log("check user success: ", action);
      return {
        ...copyStateSuccessUser,
      };
    case actionTypes.FETCH_ALL_USER_FAIL:
      let copyStateFailUser = { ...state };
      copyStateFailUser.users = action.userData;
      console.log("check user fail: ", action);
      return {
        ...copyStateFailUser,
      };
    case actionTypes.FETCH_DOCTOR_SUCCESS:
      let copyStateDoctorSuccess = { ...state };
      copyStateDoctorSuccess.doctors = action.dataDoctor;
      return {
        ...copyStateDoctorSuccess,
      };
    case actionTypes.FETCH_DOCTOR_FAIL:
      let copyStateDoctorFail = { ...state };
      copyStateDoctorFail.doctors = action.dataDoctor;
      return {
        ...copyStateDoctorFail,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      let copyStateAllDoctorSuccess = { ...state };
      copyStateAllDoctorSuccess.AllDoctors = action.dataAllDoctor;
      return {
        ...copyStateAllDoctorSuccess,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
      let copyStateAllDoctorFail = { ...state };
      copyStateAllDoctorFail.AllDoctors = action.dataAllDoctor;
      return {
        ...copyStateAllDoctorFail,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      let copyStateFetchDoctorScheduleSuccess = { ...state };
      copyStateFetchDoctorScheduleSuccess.AllScheduleTime = action.dataTime;
      return {
        ...copyStateFetchDoctorScheduleSuccess,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
      let copyStateFetchDoctorScheduleFail = { ...state };
      copyStateFetchDoctorScheduleFail.AllScheduleTime = action.dataTime;
      return {
        ...copyStateFetchDoctorScheduleFail,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS:
      let copyStateRequiredDoctorSuccess = { ...state };
      copyStateRequiredDoctorSuccess.AllRequiredDoctor = action.data;
      return {
        ...copyStateRequiredDoctorSuccess,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_FAIL:
      let copyStateRequiredDoctorFail = { ...state };
      copyStateRequiredDoctorFail.AllRequiredDoctor = action.data;
      return {
        ...copyStateRequiredDoctorFail,
      };
    default:
      return state;
  }
};

export default appReducer;
