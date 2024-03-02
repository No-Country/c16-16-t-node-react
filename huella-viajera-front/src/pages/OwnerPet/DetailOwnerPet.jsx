import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Navigate } from "react-router-dom"

//Components:
import { Home } from "./Home"
import { Pets } from "./Pets"
import { Profile } from "./Profile"
import { Posting } from "./Posting"
import { Cares } from "./Cares"

//Assets:
import BG from '@assets/BG.png'

export const DetailOwnerPet = () => {

  const {itemSelected} = useContext(UserContext) 
  let token = sessionStorage.getItem("token")

  return (
  <>
    {token ?
    <div className="w-full p-8 bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${BG})`}} >
      {itemSelected === "profile" && <Profile/>}
      {itemSelected === "home" && <Home/>}
      {itemSelected === "pets" && <Pets/>}
      {itemSelected === "posting" && <Posting/>}
      {itemSelected === "cares" && <Cares/>}
    </div>
  : <Navigate to="/"/>}
  </>
            
  )
}
