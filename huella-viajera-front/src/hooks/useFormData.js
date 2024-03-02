import { useState } from "react";

export const useForm = (initialForm = {}) => {
  
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({target}) => {
        
        if(target.name!=="image") {
            setFormState({
                ...formState, 
                [target.name] : target.value,
            }) 
        } else {
            setFormState({
                ...formState, 
                [target.name] : target.files[0],
            })
        }
        
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }
    

    return {
            ...formState,
            formState,
            onInputChange,
            onResetForm,
        }
}