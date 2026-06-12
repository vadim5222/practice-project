import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import AxiosRequest from '../utils/AxiosRequest'


const RegisterForm = () => {

    const {register, handleSubmit} = useForm()

    const onRegister = async (data) => {
        try{
            const response = await AxiosRequest.post('api/auth/register/', {
                username: data.username,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
            })
            console.log(response)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <div className='w-2/4 mx-auto p-10'>
        <h1 className='text-center text-5xl mb-3'>Создайте аккаунт</h1>
        <p className='mb-8 text-center'>Уже есть аккаунт? <Link to='/login'>Войти</Link></p>
        <form onSubmit={handleSubmit(onRegister)}>
            <input placeholder='Имя пользователя' class="w-full border border-gray-400 outline-none mb-7 px-3 py-2 rounded-sm " type="username" {...register('username')}/>
            <input placeholder='E-mail' class="w-full border border-gray-400 outline-none mb-7 px-3 py-2 rounded-sm" type="email" {...register("email")}/>
            <input placeholder='Пароль' class="w-full border border-gray-400 outline-none mb-7 px-3 py-2 rounded-sm" type="password" {...register('password')}/>
            <input placeholder='Подтверждение пароля' class="w-full border border-gray-400 outline-none mb-7 px-3 py-2 rounded-sm" type="password" {...register('password_confirmation')}/>
            <button className='bg-gray-400 px-14 py-1.5 rounded-md cursor-pointer' type='submit'>Зарегистрироваться</button>
        </form>
        </div>
    )
}

export default RegisterForm