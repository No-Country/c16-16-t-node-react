import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

//DB INTERNA PROVISORIA HASTA LEVANTAR IMAGENES QUE GESTIONARA WELLINTON
import {ownerPetImages} from "./db"

export const Home = () => {

  const [isLoading, setIsLoading] = useState(false)

  const {userData} = useContext(UserContext)

  return (
<div className=" bg-white rounded-3xl px-12 py-6 w-full shadow-lg">

  <h1 className="text-2xl font-bold">Mi Hogar</h1>
  <div className='py-4'>
    <div className="flex-col justify-start items-center gap-8">
      {isLoading 
      ? 
      <div className='mx-auto my-16'>Cargando... Aguarde un momento</div>
      :
      <div className='w-full my-4 p-4 flex flex-wrap justify-evenly gap-3'>
        {
        ownerPetImages.map((image, idx) => {
          return(
          <div key={idx} className='my-4'>
            <img src={image} className='object-cover w-48 h-48 rounded-lg' alt="user images"/>
            {/* <span className="mx-auto flex w-5 h-5 rounded-full border-2 border-white  justify-center items-center font-semibold text-sm text-white hover:cursor-pointer absolute top-2 right-2">X</span> */}
          </div>)})}
      </div>
      }
      <ul className='flex justify-center items-center text-lg gap-8 font-normal'>
        <li><span className='text-xl font-semibold mr-3'>DIRECCIÓN:</span>{userData.ownerPet.address}</li>
        <li><span className='text-xl font-semibold mr-3'>CIUDAD:</span>{userData.ownerPet.city}</li>
        <li><span className='text-xl font-semibold mr-3'>PAÍS:</span>{userData.ownerPet.country}</li>
      </ul>
    </div>
  </div>

</div>
)
}