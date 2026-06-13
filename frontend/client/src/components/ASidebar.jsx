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
                        user ? user?.username : <Link to='/login'>Авторизируйтесь</Link>

                    }>
                        <MenuItem component={<Link to='/profile' />}>Профиль</MenuItem>
                        <MenuItem>Настройки</MenuItem>
                        <MenuItem>
                            <button>
                                <div className='flex items-center gap-5'>
                                    <img className='w-5' src="/logout.png" alt="logout" />
                                    <p>Выйти</p>
                                </div>
                            </button>
                        </MenuItem>
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