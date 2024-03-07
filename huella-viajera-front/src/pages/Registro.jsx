import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import {useForm} from '../hooks/useForm'

//Assets:
import BG from '@assets/registroBG.png'

export const Registro = () => {

    const {userData, dataTypeUser, onInputChange, onResetForm} = useForm()
 
  
  
    //Logica al ENVIAR el formulario de REGISTRO
    const onSubmit = (e) => {
  
        e.preventDefault()
        const formData = {
            "userData": userData,
            "dataTypeUser": dataTypeUser
        }

        if (userData.password.length > 7){

            async function newUser() {
                try {
                console.log(formData)
                const responsePost = await axios.post('https://huellaviajera.onrender.com/api/v1/users/signup', formData);
                console.log(responsePost)
                alert("Registro exitoso")
                
                } catch (error) {
                console.error(error);
                }
            }
            newUser()

        } else {
            alert("La contraseña elegida debe contener al menos 8 caracteres")
            return
        }

        onResetForm()
  
    }

  return (
   
        <div className="flex w-full h-[90vh] min-h-[650px] bg-cover bg-center justify-end items-center"  style={{ backgroundImage: `url(${BG})`}}>
            <div className='flex bg-white rounded-l-3xl w-1/2 justify-center items-center h-[820px]'>
                <aside className='flex flex-col justify-center bg-white w-[500px] h-[750px] p-6 mx-6 rounded-3xl shadow-lg drop-shadow-lg'>
                    <h1 className='text-center my-4 text-2xl font-bold'>Crea una cuenta</h1>
                    <form className='text-center w-4/5 mx-auto mt-2 text-sm' onSubmit={onSubmit}>
                        <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="text" name="name" value={dataTypeUser.name} placeholder='Nombre y Apellido' onChange={onInputChange} required/>
                        <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="text" inputMode='numeric' name="dni" value={dataTypeUser.dni} placeholder='Número de Identificación' onChange={onInputChange} required/>
                        <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="text" name="phone" value={dataTypeUser.phone} placeholder='Número de Teléfono' onChange={onInputChange} required/>
                        <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="text" name="address" value={dataTypeUser.address} placeholder='Dirección' onChange={onInputChange} required/>
                        <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="text" name="city" value={dataTypeUser.city} placeholder='Ciudad' onChange={onInputChange} required/>
                        <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="text" name="postcode" value={dataTypeUser.postcode} placeholder='Código Postal' onChange={onInputChange} required/>
                        <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="text" name="country" value={dataTypeUser.country} placeholder='Pais de Residencia' onChange={onInputChange} required/>
                        <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="email" name="email" value={userData.email} placeholder='Dirección de Email' onChange={onInputChange} required/>
                        <input className='placeholder-gray-600 border rounded-sm hover:border-cyan hover:shadow-md focus:outline-cyan focus:shadow-md p-2 my-2 w-full' type="password" name="password" value={userData.password} placeholder='Contraseña' onChange={onInputChange} required/>
                        <span>Quiero registrarme como: <br /></span>
                        <div className='flex justify-around'>
                            <div><input className='p-2 my-2' type="radio" name="role" value="carer" onChange={onInputChange} checked={userData.role==="carer" ? true : false} required/> <span> Cuidador</span></div>
                            <div><input className='p-2 my-2' type="radio" name="role" value="ownerPet" onChange={onInputChange} checked={userData.role==="ownerPet" ? true : false} required/> <span> Dueño de Mascota</span></div>
                        </div>
                        <button className='mx-6 my-2 font-bold bg-orange text-white py-2 px-4 rounded-full hover:shadow-lg text-lg' type='submit'>Crear Cuenta</button>
                    </form>
                    <p className='text-sm text-center'>¿Ya tienes cuenta? 
                        <Link to={"/ingresar"} className='font-bold hover:underline'> Ingresa Aqui</Link>

                    </p>
                </aside>
            </div>
        </div>
  )
}