import axios from "../axios";

const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUser = (data) => {
  console.log("Check data: ", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUser = (userId) => {
  return axios.put("/api/edit-user", userId);
};

const HandleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllcodeService = (inputType) => {
  return axios.get(`/api/allcodes?type=${inputType}`);
};

const getDoctorHome = (limit) => {
  return axios.get(`/api/get-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get("/api/get-all-doctors");
};

const SaveInfoDoctor = (data) => {
  return axios.post("/api/save-info-doctor", data);
};

const getDetailDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const SaveBulkSchedule = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInfoDoctor = (inputdoctorId) => {
  return axios.get(
    `/api/get-extra-info-doctor-by-id?doctorId=${inputdoctorId}`
  );
};

const getProfileDoctor = (inputId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${inputId}`);
};

const PostPatientAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const VerifyEmailBooking = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const CreateNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialty = () => {
  return axios.get("/api/get-all-specialty");
};

const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&&location=${data.location}`
  );
};

const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getAllClinic = () => {
  return axios.get("/api/get-all-clinic");
};

const getDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const PostSendRemedy = (data) => {
  return axios.post(`/api/send-remedy`, data);
};
export {
  getAllUser,
  createNewUser,
  deleteUser,
  editUser,
  HandleLoginAPI,
  getAllcodeService,
  getDoctorHome,
  getAllDoctors,
  SaveInfoDoctor,
  getDetailDoctor,
  SaveBulkSchedule,
  getScheduleDate,
  getExtraInfoDoctor,
  getProfileDoctor,
  PostPatientAppointment,
  VerifyEmailBooking,
  CreateNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  getAllPatientForDoctor,
  PostSendRemedy,
};
