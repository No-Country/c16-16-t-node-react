import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import exampleProfilePhoto from '@assets/profile.jpg'

export const Profile = () => {

  const {userData} = useContext(UserContext) 
 

  return (
    <div className=" bg-white rounded-3xl px-12 py-6 w-full shadow-lg">

      <h1 className="text-2xl font-bold">Mis Datos</h1>
      <div className='py-4'>
        <div className="flex justify-start items-center gap-8">
          <div className="w-64 h-64 bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${exampleProfilePhoto})`}}></div>
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
        <h1 className='text-lg text-justify mt-4'><span className='text-xl font-bold'>SOBRE MI:</span><br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, neque eos quas quo veniam animi dolore sunt repellat expedita? Distinctio deserunt quaerat officia blanditiis tempora ab, doloribus voluptatum labore necessitatibus.</h1>
         
      </div>
      

                
    </div>
  )
}
