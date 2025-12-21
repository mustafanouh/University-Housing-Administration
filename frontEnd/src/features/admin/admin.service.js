import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/admin",
    headers: { "Content-Type": "application/json" },
});

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