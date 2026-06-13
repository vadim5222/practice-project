import './App.css'
import { useState, useEffect } from 'react'
import AxiosRequest from './utils/AxiosRequest'
import { useNavigate } from 'react-router'

function App() {

  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    AxiosRequest.get('api/user/info', {
      withCredentials: true
    })
    .then(res => {
      setUser(res.data.data.user)
    })
    .catch(() => setUser(null))
  }, [])


  const Logout = async(data) => {
    try{
      const response = await AxiosRequest.post('api/auth/logout',{},{
        withCredentials: true
      })
      console.log(response)
    }catch(e){
      console.log(e)
    }
  }



  return (
    <>
      <h1>{user ? `Добро пожаловать ${user.username}` : 'Чтобы пользоваться нашим сервисом авторизуйтесь'}</h1>
      {user && <button onClick={Logout}>Выйти</button>}
    </>
  )
}

export default App
