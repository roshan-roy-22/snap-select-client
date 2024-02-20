import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverURL";

// //register api
// export const registerAPI = async (user) => {
//     return await commonAPI("POST", `${SERVER_URL}/register`, user, "")
// }

// //login api
// export const loginAPI = async (user)=>{
//     return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
// }

// //userinfo api 

// export const userinfoAPI = async (reqHeader) => {
//     return await commonAPI("POST", `${SERVER_URL}/user-info`, "", reqHeader)
// }

// export const applyVendorAPI = async (reqBody, reqHeader) => {
//     return await commonAPI("POST", `${SERVER_URL}/apply-vendor`,  reqBody, reqHeader)
// }

// register api
export const registerAPI = async (user) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, user, {});
}

// login api
export const loginAPI = async (user) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, user, {});
}

// userinfo api 
export const userinfoAPI = async (reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/user-info`, "", reqHeader || {});
}

// applyVendor api
export const applyVendorAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/apply-vendor`, reqBody, reqHeader);
}

export const markNotificationAPI = async (reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/setseen-notification`,"",reqHeader)
}

export const deleteNotificationAPI = async (reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/delete-notification`,"",reqHeader)
}