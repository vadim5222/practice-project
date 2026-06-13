import './App.css'
import { useState, useEffect } from 'react'
import AxiosRequest from './utils/AxiosRequest'
import { Link } from 'react-router'

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    AxiosRequest.get('api/user/info', {
      withCredentials: true
    })
      .then(res => {
        setUser(res.data.data.user)
      })
      .catch(() => setUser(null))
  }, [])


  const Logout = async (data) => {
    try {
      const response = await AxiosRequest.post('api/auth/logout', {}, {
        withCredentials: true
      })
      setUser(null)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <>
      <h1>{user ? `Добро пожаловать ${user.username}` : <Link to='/login'>Авторизуйтесь</Link>}</h1>
      {user && <button onClick={Logout}>Выйти</button>}
    </>
  )
}

export default App
