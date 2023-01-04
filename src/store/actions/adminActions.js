import actionTypes from "./actionTypes";
import {
  getAllcodeService,
  createNewUser,
  getAllUser,
  deleteUser,
  editUser,
  getDoctorHome,
  getAllDoctors,
  SaveInfoDoctor,
  getAllSpecialty,
  getAllClinic,
} from "../../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// export const adminLoginSuccess = (adminInfo) => ({
//   type: actionTypes.ADMIN_LOGIN_SUCCESS,
//   adminInfo: adminInfo,
// });

// export const adminLoginFail = () => ({
//   type: actionTypes.ADMIN_LOGIN_FAIL,
// });

// export const processLogout = () => ({
//   type: actionTypes.PROCESS_LOGOUT,
// });

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllcodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      dispatch(fetchGenderFail());
      console.log(error);
    }
  };
};

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllcodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      dispatch(fetchPositionFail());
      console.log(error);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllcodeService("ROLE");
      let res1 = await getDoctorHome(3);
      console.log("Check res1: ", res1);
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (error) {
      dispatch(fetchRoleFail());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

export const CreateNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUser(data);
      if (res && res.errCode === 0) {
        //console.log("Check create user redux: ", res);
        toast.success("Create user success");
        dispatch(createUserSuccess());
        dispatch(FetchAllUserStart());
      } else {
        toast.error("Create user fail");
        dispatch(createUserFail());
      }
    } catch (error) {
      toast.error("Create error!!");
      dispatch(createUserFail());
      console.log(error);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});

export const FetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser("ALL");
      if (res && res.errCode === 0) {
        dispatch(FetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all user fail");
        dispatch(FetchAllUserFail());
      }
    } catch (error) {
      toast.error("Fetch error!!");
      dispatch(FetchAllUserFail());
      console.log(error);
    }
  };
};

export const FetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  userData: data,
});

export const FetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIL,
});

export const DeleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(userId);
      if (res && res.errCode === 0) {
        //console.log("Check delete user redux: ", res);
        toast.success("Delete user success");
        dispatch(DeleteUserSuccess());
        dispatch(FetchAllUserStart());
      } else {
        toast.error("Delete user fail");
        dispatch(DeleteUserFail());
      }
    } catch (error) {
      toast.error("Delete error!!");
      dispatch(DeleteUserFail());
      console.log(error);
    }
  };
};

export const DeleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const DeleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

export const EditUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUser(data);
      if (res && res.errCode === 0) {
        //console.log("Check edit user redux: ", res);
        toast.success("Edit user success");
        dispatch(EditUserSuccess());
        dispatch(FetchAllUserStart());
      } else {
        toast.error("Edit user fail");
        dispatch(EditUserFail());
      }
    } catch (error) {
      toast.error("Edit error!!");
      dispatch(EditUserFail());
      console.log(error);
    }
  };
};

export const EditUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const EditUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});

export const FetchLoadingDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getDoctorHome("");
      if (res && res.errCode === 0) {
        dispatch(FetchLoadingDoctorSuccess(res.data));
      } else {
        dispatch(FetchLoadingDoctorFail());
      }
    } catch (error) {
      dispatch(FetchLoadingDoctorFail());
      console.log(error);
    }
  };
};

export const FetchLoadingDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_DOCTOR_SUCCESS,
  dataDoctor: data,
});

export const FetchLoadingDoctorFail = () => ({
  type: actionTypes.FETCH_DOCTOR_FAIL,
});

export const FetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataAllDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALL_USER_FAIL,
      });
      console.log(error);
    }
  };
};

export const SaveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await SaveInfoDoctor(data);
      if (res && res.errCode === 0) {
        toast.success("Save doctor succeed");
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save doctor fail");
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_FAIL,
        });
      }
    } catch (error) {
      toast.error("Save doctor fail");
      dispatch({
        type: actionTypes.SAVE_INFO_DOCTOR_FAIL,
      });
      console.log(error);
    }
  };
};

export const FetchDoctorScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
      });
      console.log(error);
    }
  };
};

export const getRequiredDoctor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_START });
      let resPrice = await getAllcodeService("PRICE");
      let resPayment = await getAllcodeService("PAYMENT");
      let resProvince = await getAllcodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(getRequiredDoctorSuccess(data));
      } else {
        dispatch(getRequiredDoctorFail());
      }
    } catch (error) {
      dispatch(getRequiredDoctorFail());
      console.log(error);
    }
  };
};

export const getRequiredDoctorSuccess = (AllRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS,
  data: AllRequiredData,
});
export const getRequiredDoctorFail = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_FAIL,
});
