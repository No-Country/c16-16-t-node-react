import { useState } from "react";



export const useForm = () => {
  
    const initialDataTypeUser = {
        "name":"",
        "dni": "",
        "phone":"",
        "address":"",
        "city":"",
        "postcode":"",
        "country":""
    }
    const initialUserData= {
        "email":"",
        "password":"",
        "role":""
    }

    const [userData, setUserData] = useState(initialUserData);
    const [dataTypeUser, setDataTypeUser] = useState(initialDataTypeUser);

    const onInputChange = ({target}) => {
        
        if(target.name == "email" || target.name == "password" || target.name == "role") {
            setUserData({
                ...userData, 
                [target.name] : target.value,
            }) 
        } else if (target.name == "dni") {
                setDataTypeUser({
                    ...dataTypeUser, 
                    [target.name] : Number(target.value)
            })
        } else {
            setDataTypeUser({
                ...dataTypeUser, 
                [target.name] : target.value,
        })
    }
        
    }

    const onResetForm = () => {
        setUserData(initialUserData)
        setDataTypeUser(initialDataTypeUser)
    }
    

    return {
            ...userData,
            userData,
            ...dataTypeUser,
            dataTypeUser,
            onInputChange,
            onResetForm,
        }
}
