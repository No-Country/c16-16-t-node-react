import { useContext, useState } from 'react';
import axios from "axios"
import { Link, Navigate} from 'react-router-dom'
import { UserContext } from '../context/UserContext';

//Assets:
import BG from '@assets/BG.png'


export const Ingresar = () => {

const initialLoginForm = {
    "email":"", 
    "password":""
}

const [loginForm, setLoginForm] = useState(initialLoginForm);
const [isLoading, setIsLoading] = useState(false)

const onInputChange = ({target}) => {
    setLoginForm({
        ...loginForm, 
        [target.name] : target.value,
    })
}

//Logica al ENVIAR el formulario de LOGIN
const {userData, setUserData} = useContext(UserContext)

const onSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = loginForm
    setLoginForm(initialLoginForm)

      async function loginUser() {
        
        try {

          const responsePost = await axios.post('https://huellaviajera.onrender.com/api/v1/users/signin', formData);
          //Almacenando respuesta en Context
          setUserData(responsePost.data.data)
          //Almacenando token en sessionStorage
          console.log(responsePost.data.meta.token)
          sessionStorage.setItem("token", responsePost.data.meta.token)
          setIsLoading(false)

        } catch (error) {
          console.error(error);
        } 
      }
      loginUser()
}

  return (
   <>
        {userData.role === "carer" && <Navigate to={`/carer?userId=${userData.id}`}/>}
        {userData.role === "ownerPet" && <Navigate to={`/ownerPet?userId=${userData.id}`}/>}

        <div className="flex w-full h-[90vh] min-h-[650px] bg-cover bg-center justify-center items-center" style={{ backgroundImage: `url(${BG})`}}>
            <div className='flex flex-col w-[400px] h-[350px] p-6 mx-6 rounded-md shadow-lg justify-center bg-gray-100'>
                <h1 className='text-center text-2xl'>Ingresa a tu cuenta</h1>
                {isLoading ? <div className='mx-auto my-16'>Cargando... Aguarde un momento</div> : 
                <form className='text-center w-4/5 mx-auto mt-4' onSubmit={onSubmit}>
                    <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="email" name='email' value={loginForm.email} placeholder='Dirección de Email' onChange={onInputChange} required/>
                    <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="password" name='password' value={loginForm.password} placeholder='Contraseña' onChange={onInputChange} required/>
                    <button className=' mx-6 m-2 font-bold bg-white border-2 border-cyan text-cyan p-2 rounded-md hover:bg-cyan hover:text-white' type='submit'>Iniciar Sesion</button>
                </form>}
                <p className='text-sm text-center'>¿No tienes cuenta? 
                    <Link to={"/registro"} className='font-bold hover:underline'> Regístrate Aqui</Link>
                </p>
            </div>
        </div>
   </>
        
  )
}