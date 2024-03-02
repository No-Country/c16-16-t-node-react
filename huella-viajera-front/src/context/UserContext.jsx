import { createContext, useState } from "react";


export const UserContext = createContext()

export function UserContextProvider(props) {

const [userData, setUserData] = useState({})
const [itemSelected, setItemSelected] = useState("profile")


    return (
        <UserContext.Provider value={{userData, setUserData, itemSelected, setItemSelected}}>
            {props.children}
        </UserContext.Provider>
    )
}