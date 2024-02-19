import axios from 'axios'

export const commonAPI = async (httpReqest, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpReqest,
        url, data: reqBody, headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }
    return await axios(reqConfig).then((result) => {
        return result
    }).catch((err) => {
        return console.log(err);
    })
}

// export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
//     const reqConfig = {
//         method: httpRequest,
//         url,
//         data: reqBody,
//         headers: {
//             ...(reqHeader ? reqHeader : {}),
//             "Content-Type": "multipart/form-data" // Ensure Content-Type is set to multipart/form-data
//         }
//     };

//     try {
//         const result = await axios(reqConfig);
//         return result;
//     } catch (err) {
//         return err;
//     }
// };

// export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
//     const defaultHeaders = {
//         "Content-Type": "application/json", // Default Content-Type is application/json
//     };

//     const headers = {
//         ...defaultHeaders,
//         ...(reqHeader ? reqHeader : {}),
//     };

//     const reqConfig = {
//         method: httpRequest,
//         url,
//         data: reqBody,
//         headers,
//     };

//     return await axios(reqConfig).then((result) => {
//         return result
//     }).catch((err) => {
//         return err
//     })
// };

// import axios from 'axios';

// const commonAPI = async (method, url, data = null, headers = {}) => {
//     try {
//         // Set default Content-Type to application/json if not provided
//         if (!headers['Content-Type']) {
//             headers['Content-Type'] = 'application/json';
//         }

//         const response = await axios({
//             method,
//             url,
//             data,
//             headers
//         });

//         return response.data;
//     } catch (error) {
//         console.error('API Error:', error);
//         throw error; // Re-throw the error to be handled by the caller
//     }
// };

// export default commonAPI;


