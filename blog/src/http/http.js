import axios from 'axios';

export default function() {
    const instance = axios.create();

    instance.interceptors.request.use((request) => {
        return request;
    });

    instance.interceptors.response.use((response) => {
        if (response.data.code === 200) {
            return response.data.data
        } else {
            return response.data
        }
    },err=>{
        document.cookie = `Token='';path=/;expires=-1`;
        return Promise.reject(err);
    });

    return instance;
}