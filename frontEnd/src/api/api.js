import axios from "axios";
import Cookies from "js-cookie";

/* =========================
   Axios Instance
========================= */
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   Token Interceptor
========================= */
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* =====================================================
   AUTH – EMPLOYEE (public)
===================================================== */
export const registerApi = (data) =>
  api.post("/register", data).then((r) => r.data);

export const loginApi = (data) =>
  api.post("/login", data).then((r) => r.data);

/* =====================================================
   AUTH – STUDENT (public)
===================================================== */
export const studentRegisterApi = (data) =>
  api.post("/std/register", data).then((r) => r.data);

export const studentLoginApi = (data) =>
  api.post("/std/login", data).then((r) => r.data);

/* =====================================================
   ADMIN – MANAGEMENT
===================================================== */
export const getEmployees = () =>
  api.get("/admin/management/employees").then((r) => r.data);

export const getRoles = () =>
  api.get("/admin/management/roles").then((r) => r.data);

export const assignRole = (employeeId, data) =>
  api.post(`/admin/management/${employeeId}`, data).then((r) => r.data);

/* =====================================================
   ADMIN – MAINTENANCE
===================================================== */
export const getAllMaintenanceRequests = () =>
  api.get("/admin/maintenance/all").then((r) => r.data);

export const getMaintenanceProgress = () =>
  api.get("/admin/maintenance/progress").then((r) => r.data);

export const agreeMaintenanceRequest = (requestId) =>
  api.post(`/admin/maintenance/${requestId}/agree`).then((r) => r.data);

/* =====================================================
   ADMIN – UNITS
===================================================== */
export const getUnits = () =>
  api.get("/admin/units/all").then((r) => r.data);

export const getUnitStorage = (unitId) => //not used
  api.get(`/admin/units/${unitId}/storage`).then((r) => r.data);

export const getUnitRooms = (unitId) =>
  api.get(`/admin/units/${unitId}/rooms`).then((r) => r.data);

export const setUnitRoomCap = (unitId, data) =>
  api.post(`/admin/units/${unitId}/roomcap`, data).then((r) => r.data);

export const setUnitGender = (unitId, data) =>
  api.post(`/admin/units/${unitId}/gender`, data).then((r) => r.data);

/* =====================================================
   MENTOR
===================================================== */
export const mentorGetUnits = () =>
  api.get("/mentor/units").then((r) => r.data);

export const mentorGetUnitStorage = (unitId) =>
  api.get(`/mentor/units/${unitId}/storage`).then((r) => r.data);

export const mentorGetUnitRooms = (unitId) =>
  api.get(`/mentor/units/${unitId}/rooms`).then((r) => r.data);

export const setRoomState = (roomId, data) =>
  api.post(`/mentor/rooms/${roomId}`, data).then((r) => r.data);

export const getRoomStudents = (roomId) =>
  api.get(`/mentor/rooms/${roomId}/students`).then((r) => r.data);

export const sendMaintenanceRequest = (data) =>
  api.post("/mentor/maintenance", data).then((r) => r.data);

export const sendFeeRequest = (data) =>
  api.post("/mentor/fees", data).then((r) => r.data);

/* =====================================================
   STORAGE KEEPER
===================================================== */
export const getStorageItems = () =>
  api.get("/storage/items").then((r) => r.data);

export const addStorageItem = (data) =>
  api.post("/storage/new", data).then((r) => r.data);

export const updateStorageItem = (data) =>
  api.post("/storage/update", data).then((r) => r.data);

/* =====================================================
   ACCOUNTANT
===================================================== */
export const getFundLog = () =>
  api.get("/accountant/fundlog").then((r) => r.data);

export const getPaidFees = () =>
  api.get("/accountant/paidfees").then((r) => r.data);

export const getPendingFees = () =>
  api.get("/accountant/pendingfees").then((r) => r.data);

export const getAgreedMaintenance = () =>
  api.get("/accountant/maintenance").then((r) => r.data);

export const fundMaintenance = (requestId, data) =>
  api.post(`/accountant/maintenance/${requestId}`, data).then((r) => r.data);

export const approveFeePayment = (feeId) =>
  api.post(`/accountant/payments/${feeId}`).then((r) => r.data);

/* =====================================================
   MAINTENANCE SERVICE
===================================================== */
export const getMaintenanceLogAll = () =>
  api.get("/maintservice/all").then((r) => r.data);

export const getMaintenanceQueue = () =>
  api.get("/maintservice/queue").then((r) => r.data);

export const updateMaintenanceStatus = (maintenanceId, data) =>
  api.post(`/maintservice/${maintenanceId}`, data).then((r) => r.data);

/* =====================================================
   STUDENT (authenticated)
===================================================== */
export const checkHousing = () =>
  api.get("/std/check").then((r) => r.data);

export const getRoommate = () =>
  api.get("/std/roommate").then((r) => r.data);

export const cancelRoommate = (requestId) =>
  api.post(`/std/roommate/cancel/${requestId}`).then((r) => r.data);

export const getStudentFees = () =>
  api.get("/std/fees").then((r) => r.data);

export const sendHousingRequest = (data) =>
  api.post("/std/request", data).then((r) => r.data);

/* =====================================================
   LOGOUT
===================================================== */
export const logoutEmployee = () =>
  api.post("/logout").then((r) => r.data);

export const logoutStudent = () =>
  api.post("/std/logout").then((r) => r.data);

export default api;
