import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { useState, useEffect } from 'react'
import AxiosRequest from '../utils/AxiosRequest'
import { Link } from 'react-router'



const ASidebar = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        AxiosRequest.get('api/user/info', {
            withCredentials: true
        })
            .then(res => { setUser(res.data.data.user) })
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
            <Sidebar rootStyles={{
                height: '100vh',
            }}>
                <Menu>
                    <SubMenu label={
                        user ? user?.username : 'Добро пожаловать Гость'

                    }>
                        {user ? <div>
                            <MenuItem component={<Link to='/profile' />}>Профиль</MenuItem>
                            <MenuItem>Настройки</MenuItem>
                            <MenuItem>
                                <div>
                                    <button onClick={Logout} className='flex items-center gap-6 cursor-pointer'>
                                        <img className='w-5' src="/logout.png" alt="logout" />
                                        <p>Выйти</p>
                                    </button>
                                </div>
                            </MenuItem>
                        </div>
                            :
                            <div>
                                <MenuItem component={<Link to='/login' />}>Войти</MenuItem>
                                <MenuItem component={<Link to='/register' />}>Зарегистрироваться</MenuItem>
                            </div>}
                    </SubMenu>
                    <SubMenu label='Недавнее'>
                        <MenuItem>Пока ниче нету</MenuItem>
                    </SubMenu>
                </Menu>

            </Sidebar>
        </>
    )
}

export default ASidebar