import { Navigate } from "react-router-dom"
// import Fotolanding from '../../assets/foto_landing.jpg'

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export const Carer = () => {

    const {setUserData} = useContext(UserContext)
    let token = sessionStorage.getItem("token")

    const sessionClose = () => {
        sessionStorage.setItem("token", "")
        setUserData({})
    }

  return (
    <>
    {token ? 

    <div className="w-full my-8 bg-gray-600 flex">
        <div className="border-2 w-1/4 p-4">
            <h1 className="font-bold">CARER NAME - Cuidador</h1> <span className="hover:font-bold hover:cursor-pointer text-white" onClick={sessionClose}>Cerrar Sesión</span>
            <ul className="font-semibold my-3 space-y-2">
                <li>Mi Perfil</li>
                <li>Mis Reseñas </li>
                <li>MI ANUNCIO</li>
            </ul>
        </div>
        <div className="border-2 w-3/4 p-4">
            <div className=" bg-gray-300 border-2 m-4 h-64 flex gap-4">
                <div className="w-52 h-52 border-2 rounded-full"> 
                    {/* <img className="h-full " src={Fotolanding} alt="" /> */}
                </div>
                <div>
                    HOGARES DISPONIBLES
                </div>
            </div>
        </div>
    </div>

    : <Navigate to="/"/>}
    </>
  )
}
