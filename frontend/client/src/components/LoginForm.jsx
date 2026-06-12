import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

const LoginForm = () => {

    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }
    return(
        <div className='w-2/4 mx-auto p-10'>
        <h1 className='text-center text-5xl mb-3'>Войдите в систему</h1>
        <p className='mb-8 text-center'>Нету аккаунта? <Link to='/register'>Зарегистрироваться</Link></p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder='E-mail' class="w-full border border-gray-400 outline-none mb-7 px-3 py-2 rounded-sm" type="email" {...register("email")}/>
            <input placeholder='Пароль' class="w-full border border-gray-400 outline-none mb-7 px-3 py-2 rounded-sm" type="password" {...register('password')}/>
            <button className='bg-gray-400 px-14 py-1.5 rounded-md cursor-pointer' type='submit'>Войти</button>
        </form>
        </div>
    )
}

export default LoginForm