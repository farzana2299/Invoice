import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonStructure";

export const userRegisterApi = async (body) => {
    return await commonApi('POST', `${BASE_URL}/users/register`, body, "")
}

export const userLoginApi = async (body) => {
    return await commonApi('POST', `${BASE_URL}/user/login`, body, "")
}
export const getUserDetailsApi = async (header) => {
    return await commonApi('GET', `${BASE_URL}/user`, "", header)
}
export const editUserApi = async (id, header, body) => {
    return await commonApi('PUT', `${BASE_URL}/user/edit-profile/${id}`, body, header)
}
export const addClientApi = async (data, header) => {
    return await commonApi('POST', `${BASE_URL}/invoices/client`, data, header)
}
export const getClientDetailsApi = async (header) => {
    return await commonApi('GET', `${BASE_URL}/invoices/clients`, "", header)
}
export const editClientApi = async (id, header, body) => {
    return await commonApi('PUT', `${BASE_URL}/invoices/client/${id}`, body, header)
}
export const getClientDetailApi = async (id,header) => {
    return await commonApi('GET', `${BASE_URL}/invoices/client/${id}`, "", header)
}
export const deleteClient=async(id,header)=>{
    return await commonApi('DELETE',`${BASE_URL}/invoices/client/${id}`,"",header)
  }
  export const addItemApi = async (id,data, header) => {
    return await commonApi('POST', `${BASE_URL}/item/add/${id}`, data, header)
}