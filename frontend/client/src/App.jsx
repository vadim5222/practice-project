import './App.css'
import AxiosRequest from './utils/AxiosRequest'
import { Link } from 'react-router'
import ASidebar from './components/ASidebar'
import { useState, useEffect } from 'react'

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    AxiosRequest.get('api/user/info/',{
      withCredentials: true
    })
    .then(res => setUser(res.data.data.user))
    .catch(() => setUser(null))
  })

  return (
    <>
      <div className='flex h-screen'>
        <ASidebar />
        <div className='flex-1 flex items-center justify-center'>
          <div>
            {user ? <h1 className='text-center text-gray-300 mb-4'>Добрый день, {user?.username},чем могу вам помочь?</h1>
            :
            <h1 className='text-center text-gray-300 mb-4'>Вы не авторизованы!<Link to='/login'>Войдите</Link> или <Link to='/register'>Зарегистрируйтесь</Link></h1>
            }
            <div className='flex items-center border border-gray-400 p-1.5 rounded-3xl'>
              <input className='block outline-none text-gray-200 mx-auto p-2 border-none w-2xl rounded-2xl' type="text" />
              <button className='bg-gray-300 p-1.5 rounded-xl cursor-pointer'>
                <img className='w-5' src="/send.png" alt="send" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
