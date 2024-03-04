import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Navigate } from "react-router-dom"

//DB INTERNA PROVISORIA HASTA LEVANTAR IMAGENES QUE GESTIONARA WELLINTON
import {ownerPetImages} from "./db"

export const OwnerPetPannel = () => {

  const {userData, setUserData, setItemSelected} = useContext(UserContext)

  let token = sessionStorage.getItem("token")

  const first4images = ownerPetImages.slice(0,4) 

  const selected = (e) => {
    setItemSelected(e.target.id)
  }

  const sessionClose = () => {
    sessionStorage.setItem("token", "")
    setUserData({})
    setItemSelected("profile")
  }


  return (
    <>
    {token ?
    <div className=" flex-col w-[450px] py-20 space-y-4 shadow-lg">
            
            <div className='flex justify-center items-center gap-4 px-8'>
              <div className="w-16 h-16 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${userData.ownerPet.image})`}}></div>
              <div>
                <h1 className="font-bold text-center">{userData.ownerPet.name}</h1>
                <p>{userData.email}</p>
              </div>
            </div>
            
            <div className="font-semibold my-1">
              <div className='flex flex-col'>
                <div className='border-b border-gray-400 mx-16 mt-4'></div>
                <div className='w-full my-4 p-4 flex flex-wrap justify-evenly gap-3'>
                  {
                  first4images.map((image, idx) => {
                    return(
                    <div key={idx}>
                      <img src={image} className='object-cover w-16 h-16 rounded-lg' alt="user images"/>
                    </div>)})}
                </div>
              </div>
              {/* <div className='flex flex-col bg-gray-400 rounded-lg'>
                <h1 className='mt-2 py-1 mx-4 font-bold border-b' onClick={selected} id="pets">Mis Mascotas</h1> 
                <div className='w-full p-4 flex flex-wrap justify gap-3'>
                  {petImages.map((pet, idx) => {
                    return(
                    <div key={idx} className='flex-col text-center font-normal'>
                      <img src={pet.image} className='object-cover w-24 h-24' alt="user images"/>
                      <span>{pet.name}</span>
                    </div>)})}
                </div>
              </div> */}
            </div>

            <ul className='px-12 font-semibold text-lg space-y-4'>
              <li className='hover: cursor-pointer' onClick={selected} id="profile">Mis Datos</li>
              <li className='hover: cursor-pointer' onClick={selected} id="home">Mi Hogar</li>
              <li className='hover: cursor-pointer' onClick={selected} id="pets">Mis Mascotas</li>
              <li className='hover: cursor-pointer' onClick={selected} id="posting">Mis Anuncios</li>
              <li className='hover: cursor-pointer' onClick={selected} id="cares">Cuidados</li>
              <button className='pt-8 font-bold' onClick={sessionClose}>Cerrar Sesion</button>
            </ul>            
            <div className='border-b border-gray-400 mx-16 py-2'></div>
    </div>
    : <Navigate to="/"/>}
    </>
  )
}
