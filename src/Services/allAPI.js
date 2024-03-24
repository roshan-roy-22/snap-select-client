import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverURL";


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

export const markNotificationAPI = async (reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/setseen-notification`, "", reqHeader)
}

export const deleteNotificationAPI = async (reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/delete-notification`, "", reqHeader)
}

export const getAlluserAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/alluser`, "", reqHeader)
}

export const getAllphotographerAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/all-photographers`, "", reqHeader)
}

export const changeAccountStatusAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/change-acc-status`, reqBody, reqHeader);
}

export const getAllvendors = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/getallvendors`, "", reqHeader)
}

export const viewVendorAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/view-vendor`, reqBody, reqHeader)
}

export const bookAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/book-vendor`, reqBody, reqHeader)
}

export const bookingsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/user-bookings`, "", reqHeader)
}

export const vendorBookingsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/vendor-bookings`,"",reqHeader)
}

export const changeBookingStatusAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/change-bookings-status`,reqBody,reqHeader)
}

export const getPhotographersDetails = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/edit-vendor-profile`,"",reqHeader)
}