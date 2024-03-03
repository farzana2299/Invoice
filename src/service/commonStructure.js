import axios from "axios";

export const commonApi = async (method, url, body, header) => {
    if(body!=="")
    {
        const config = {
            method,
            url,
            data: body,
            headers: header ? header : { 'Content-Type': 'application/json' }
        }
        return await axios(config).then(response => {
            return response
        }).catch(error => {
            return error
        })
    }
    else{
        const config = {
            method,    
            url,
            headers: header ? header : { 'Content-Type': 'application/json' }
        }
        return await axios(config).then(response => {
            return response
        }).catch(error => {
            return error
        })
    }


}