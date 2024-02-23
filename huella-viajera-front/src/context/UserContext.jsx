import { createContext, useState } from "react";


export const UserContext = createContext()

export function UserContextProvider(props) {

const [userData, setUserData] = useState({})

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {props.children}
        </UserContext.Provider>
    )
}