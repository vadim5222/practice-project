import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import AxiosRequest from '../utils/AxiosRequest'
import { redirect } from 'react-router'
import { useEffect, useState } from 'react'

const LoginForm = () => {

    const { register, handleSubmit } = useForm()
    const [user, setUser] = useState(null)


    const onLogin = async (data) => {
        try {
            const response = await AxiosRequest.post('api/auth/login/', {
                email: data.email,
                password: data.password
            }, {
                withCredentials: true
            })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        AxiosRequest.get('api/user/info', {
            withCredentials: true
        })
            .then(res => { setUser(res.data.data.user) })
            .catch(() => setUser(null))
    }, [user])


    return (
        <div className='w-2/4 mx-auto p-10'>
            <h1 className='text-center text-5xl mb-3'>Войдите в систему</h1>
            <p className='mb-8 text-center'>Нету аккаунта? <Link to='/register'>Зарегистрироваться</Link></p>
            <form onSubmit={handleSubmit(onLogin)}>
                <input placeholder='E-mail' className="w-full border border-gray-400 outline-none mb-7 px-3 py-2 rounded-sm" type="email" {...register("email")} />
                <input placeholder='Пароль' className="w-full border border-gray-400 outline-none mb-7 px-3 py-2 rounded-sm" type="password" {...register('password')} />
                <button className='bg-gray-400 px-14 py-1.5 rounded-md cursor-pointer' type='submit' >Войти</button>
            </form>
        </div>
    )
}

export default LoginForm