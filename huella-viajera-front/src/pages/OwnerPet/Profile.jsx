import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from "axios"
import { useForm } from "../../hooks/useFormData"
// import exampleProfilePhoto from '@assets/profile.jpg'

export const Profile = () => {

  const {formState, onInputChange, onResetForm, image, bio} = useForm()
  const {userData, setUserData} = useContext(UserContext)
  
//ACTUALIZACION DE IMAGEN DE PERFIL

 const onImage = (e) => {

  const urlImage = "https://huellaviajera.onrender.com/api/v1/owners/profilePhoto"
  const urlProfile = "https://huellaviajera.onrender.com/api/v1/owners/profile"

  const token = sessionStorage.token

  e.preventDefault()
  const formdata = new FormData()
  formdata.append('imageProfile', image)
  onResetForm()

  async function putImage() {
    try {
      const responsePut = await axios.put(`${urlImage}/${userData.ownerPet.id}`, formdata, 
        {headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
          }
        });
      console.log(responsePut)
      const responseGet = await axios.get(`${urlProfile}/${userData.ownerPet.id}`, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
        console.log(responseGet)
        setUserData({
          ...userData, 
          ["ownerPet"] : responseGet.data.data,
      })
      console.log(userData)
    } catch (error) {
      console.error(error);
    }
  }
  putImage()
 }

 //ACTUALIZACION BIOGRAFIA DE PERFIL

const [isEditMode, setIsEditMode] = useState(false)

const initEditMode = () => {
  onResetForm()
  setIsEditMode(true)
}

const finishEditMode = () => {
  
  const url = "https://huellaviajera.onrender.com/api/v1/owners/profile"

  const token = sessionStorage.token

  setIsEditMode(false)

  if(Object.keys(formState).length !== 0) {

  const formdata = new FormData()
  formdata.append('bio', bio)
  onResetForm()

  async function putBio() {
    try {
      const responsePut = await axios.put(`${url}/${userData.ownerPet.id}`, formdata, 
        {headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
          }
        });
      console.log(responsePut)
      const responseGet = await axios.get(`${url}/${userData.ownerPet.id}`, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
        console.log(responseGet)
        setUserData({
          ...userData, 
          ["ownerPet"] : responseGet.data.data,
      })
      console.log(userData)
    } catch (error) {
      console.error(error);
    }
  }
  putBio()
}
onResetForm()
 }

  return (
    <div className=" bg-white rounded-3xl px-12 py-6 w-full shadow-lg">

      <h1 className="text-2xl font-bold">Mis Datos</h1>
      <div className='py-8'>
        <div className="flex justify-center items-center gap-8">
          <div className='w-[400px] flex-col text-center space-y-6 p-4'>
            <div className="w-80 h-80 bg-cover bg-center shadow-lg mx-auto" style={{ backgroundImage: `url(${userData.ownerPet.image})`}}></div>
            <form onSubmit={onImage}>
            <input type="file" className="text-sm" name='image' onChange={onInputChange}/>
            <button type="submit" className='rounded-lg  bg-orange text-white p-1 my-4 font-semibold' onClick={onImage}>Cambiar Foto</button>
            </form>
          </div>
          <ul className='text-lg columns-2 gap-20 space-y-4'>
            <li><span className='text-xl font-semibold'>NOMBRE:</span><br />{userData.ownerPet.name}</li>
            <li><span className='text-xl font-semibold'>DNI:</span><br />{userData.ownerPet.dni}</li>
            <li><span className='text-xl font-semibold'>TELÉFONO:</span><br />{userData.ownerPet.phone}</li>
            <li><span className='text-xl font-semibold'>CORREO:</span><br />{userData.email}</li>
            <li><span className='text-xl font-semibold'>DIRECCIÓN:</span><br />{userData.ownerPet.address}</li>
            <li><span className='text-xl font-semibold'>CIUDAD:</span><br />{userData.ownerPet.city}</li>
            <li><span className='text-xl font-semibold'>PAÍS:</span><br />{userData.ownerPet.country}</li>
            <li><span className='text-xl font-semibold'>CP:</span><br />{userData.ownerPet.postcode}</li>
          </ul>
        </div>
        <div className='flex-col text-center'>
          <div>
            <label htmlFor="bio" className='text-xl font-bold'>SOBRE MI:</label><br />
            {isEditMode
            ? 
            <textarea className="w-full h-24 rounded-lg px-2 py-1 my-1 bg-gray-300" name="bio" value={bio} placeholder={userData.ownerPet.bio} onChange={onInputChange}/>
            :
            <h1 className='text-lg text-justify mt-4'>{userData.ownerPet.bio}</h1> 
            }
          </div>
          {isEditMode
          ?
          <button className='rounded-lg  bg-orange text-white p-1 my-4 font-semibold' onClick={finishEditMode}>Confirmar</button>
          :
          <button className='rounded-lg  bg-orange text-white p-1 my-4 font-semibold' onClick={initEditMode}>Cambiar Biografía</button>
          }
        </div>
        

      </div>
      

                
    </div>
  )
}
