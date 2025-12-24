// src/services/admin.service.js
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});



api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



// authentication APIs
export const loginApi = (data) =>
    api.post("/login", data).then((res) => res.data);

export const registerApi = (data) =>
    api.post("/register", data).then((res) =>{ 
        console.log("register api response:", res.data);
        return res.data;
    });

// export const logoutApi = (token) =>
//     api.post(
//         "/logout",
//         { token },
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     ).then((res) => res.data);



// Management - Employees
export const getEmployees = () => api.get("/admin/management/employees");



export default api;