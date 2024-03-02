import { Navigate } from "react-router-dom"
import { useState } from 'react';

//Components:
import { OwnerPetPannel } from "./OwnerPetPannel";
import { DetailOwnerPet } from "./DetailOwnerPet";

export const OwnerPet = () => {

    let token = sessionStorage.getItem("token")

  return (
    <>
    {token ? 

    <div className="w-full  bg-white flex">
        <OwnerPetPannel/>
        <DetailOwnerPet/>
    </div>

    : <Navigate to="/"/>}
    </>
  )
}
