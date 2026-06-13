import LoginForm from "../components/LoginForm"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import AxiosRequest from "../utils/AxiosRequest"


const LoginPage = () => {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        AxiosRequest.get('api/user/info', {
            withCredentials: true
        })
        .then(res => {setUser(res.data.data.user)})
        .catch(() => setUser(null))
    })

    useEffect(() => {
        if (user){
            navigate('/')
        }
    })



    return (
        <>
            <LoginForm />
        </>
    )
}


export default LoginPage