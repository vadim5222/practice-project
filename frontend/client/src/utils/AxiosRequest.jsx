import axios from 'axios'

const baseUrl = 'http://localhost:8000/'

const AxiosRequest = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export default AxiosRequest