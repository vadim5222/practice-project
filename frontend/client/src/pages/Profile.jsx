import { useEffect, useState } from "react"
import AxiosRequest from "../utils/AxiosRequest"

const Profile = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        AxiosRequest.get('api/user/info', {
            withCredentials: true
        })
            .then(res => setUser(res.data.data.user))
            .catch(() => setUser(null))
    })

    return (
        <div className="bg-gray-300 w-4/12 p-4 rounded-md">
            <div className="mb-3">
                <h1 className="text-center">профиль</h1>
                <p>Отображаемое имя - {user?.username}</p>
                <p>Адрес электронной почты - {user?.email}</p>
            </div>
            <button className="bg-gray-600 p-1.5 rounded-md">Редактировать</button>
        </div>
    )
}

export default Profile