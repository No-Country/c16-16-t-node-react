import { useEffect, useState } from "react"
import axios from "axios"
import { useForm } from "../../hooks/useFormData"
import { UploadImage } from "../Reusables/UploadImage"
import { OwnerPet } from "../OwnerPet/OwnerPet"

export const Pets = () => {

  const {formState, onInputChange, onResetForm, name, type, breed, age, weight, image} = useForm()

  const [pets, setPets] = useState([])

  const [modal, setModal] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const url = "https://huellaviajera.onrender.com/api/v1/pets"
  const token = sessionStorage.token

//PRIMER MONTAJE DEL COMPONENTE - TRAER TODAS LAS MASCOTAS:

  useEffect(() => {
    
    async function getAllPets() {
        
      try {
        setIsLoading(true)
        const responsePost = await axios.get(url, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
        setPets(responsePost.data.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      } 
    }
    getAllPets()

  }, [])

//AGREGAR MASCOTAS - LUEGO DE COMPLETAR EL MODAL

const onAdd = (e) => {

  e.preventDefault()
  const formdata = new FormData()
  formdata.append('name', name)
  formdata.append('type', type)
  formdata.append('breed', breed)
  formdata.append('age', age)
  formdata.append('weight', weight)
  formdata.append('imagePet', image)

  setModal("")

  onResetForm()

  async function postPets() {
    try {
      const responsePost = await axios.post(url, formdata, 
        {headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
          }
        });
      console.log(responsePost)
      const responseGet = await axios.get(url, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
        console.log(responseGet)
        setPets(responseGet.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  postPets()
 }

 //ABRIR O CERRAR MODAL (Lo utilizan funcion de AGREGAR y EDITAR)

 const openModal = (e) => {
  console.log(e.target.name)
  setModal(e.target.name)
 }
 const closeModal = () => {
  setModal("")
 }

//ELIMINAR MASCOTAS

 const onDelete = (e) => {

const petId = e.target.id

  e.preventDefault()
  
  async function deletePets() {
    try {
      const responseDelete = await axios.delete(`${url}/${petId}`, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
      console.log(responseDelete)
      const responseGet = await axios.get(url, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
        console.log(responseGet)
        setPets(responseGet.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  deletePets()
 }

//EDITAR MASCOTAS

const [isEditMode, setIsEditMode] = useState("")

const initEditMode = (e) => {
  onResetForm()
  setIsEditMode(e.target.id)
}

const finishEditMode = (e) => {
  
  setIsEditMode("")

  const form = formState
  console.log(form)

  const petId = e.target.id

  async function editPets() {
    try {

      const responsePut = await axios.put(`${url}/${petId}`, form, 
        {headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
          }
        });
      console.log(responsePut)
      const responseGet = await axios.get(url, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
        console.log(responseGet)
        setPets(responseGet.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  editPets()
}

  return (
    <>
    <div className=" bg-white rounded-3xl px-12 py-6 w-full shadow-lg">

      <h1 className="text-2xl font-bold">Mis Mascotas</h1>
      <ul className="mx-6">
        <div className="flex justify-end"><button className=" font-bold mx-4 mb-2 text-end hover:cursor-pointer" name="add" onClick={openModal}>+ Agregar Mascota</button></div>
      </ul>
      {isLoading 
      ? <div className=" flex justify-center my-8">Cargando...</div>
      : <div className='flex-col p-4 space-y-8'>
         {pets.map((pet) => {
          return(
            <div className="h-64 flex items-center border rounded-2xl py-2 px-8 justify-between shadow-lg" key={pet.id}>
              <div className= "w-40 h-40 bg-cover bg-center shadow-lg ml-16" style={{ backgroundImage: `url(${pet.image})`}}></div>
              
              
              <div className="text-lg w-[400px] flex justify-center">
                <div className="w-1/2">
                  <ul>
                <li>
                  <label className="font-semibold text-xl" htmlFor="name">Nombre:</label><br />
                  {isEditMode==pet.id ? <input className="w-36 h-8 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" id="name" name="name" value={name} placeholder={pet.name} onChange={onInputChange}/> : <span>{pet.name}</span>} 
                </li>
                <li>
                  <label className="font-semibold text-xl" htmlFor="type">Tipo:</label><br />
                  {isEditMode==pet.id ? <input className="w-36 h-8 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" id="type" name="type" value={type} placeholder={pet.type} onChange={onInputChange}/> : <span>{pet.type}</span>}
                </li>
                <li>
                  <label className="font-semibold text-xl" htmlFor="breed">Raza:</label><br />
                  {isEditMode==pet.id ? <input className="w-36 h-8 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" id="breed" name="breed" value={breed} placeholder={pet.breed} onChange={onInputChange}/> : <span>{pet.breed}</span>}
                </li>
                </ul>
                </div>
                
                <div className="w-1/2">
                <ul>
                <li>
                  <label className="font-semibold text-xl" htmlFor="age">Edad:</label><br />
                  {isEditMode==pet.id ? <input className="w-14 h-8 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" inputMode='numeric' id="age" name="age" value={age} placeholder={pet.age} onChange={onInputChange}/> : <span>{pet.age}</span>}<span>{pet.age == 1 ? " Año" : " Años"}</span>
                </li>
                <li>
                  <label className="font-semibold text-xl" htmlFor="weight">Peso:</label><br />
                  {isEditMode==pet.id ? <input className="w-14 h-8 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" inputMode='numeric' id="weight" name="weight" value={weight} placeholder={pet.weight} onChange={onInputChange}/> : <span>{pet.weight}</span>}<span>{pet.weight == 1 ? " Kilo" : " Kilos"}</span>
                </li>
                </ul>
                </div>
              </div>
              
              
              
              <div className="w-16 flex-col">
                <span className="mx-auto flex w-10 h-10 rounded-full border-2  justify-center items-center font-bold text-xl hover:cursor-pointer" id={pet.id} onClick={onDelete}><p></p>X</span>
                <div>
                  {!isEditMode 
                  ? <span className="flex font-semibold text-lg mt-28 hover:font-bold hover:cursor-pointer" name="edit" id={pet.id} onClick={initEditMode}>Editar</span>
                  : <span className="flex font-semibold text-lg mt-28 hover:font-bold hover:cursor-pointer" name="edit" id={pet.id} onClick={finishEditMode}>Listo</span>
                }
                </div>
              </div>
              
            </div>
            )})}
      </div>}              
    </div>

{/* Formulario modal para agregar nueva mascota con hook useForm: */}
    {modal === "add" && 
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
    <form onSubmit={onAdd} className="flex flex-col w-[800px] h-[550px] mx-auto rounded-3xl shadow-2xl bg-white relative">
      <h1 className="mx-auto font-bold text-2xl my-5">Nueva Mascota</h1>
      <div className="flex items-center justify-evenly">
      <UploadImage onInputChange={onInputChange}/>
      <ul className="p-4">
        <li>
          <label className="font-semibold" htmlFor="name">Nombre:</label><br />
          <input className="w-64 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" id="name" name="name" value={name} onChange={onInputChange}/>
        </li>
        <li>
          <label className="font-semibold" htmlFor="type">Tipo:</label><br />
          <input className="w-64 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" id="type" name="type" value={type} onChange={onInputChange}/>
        </li>
        <li>
          <label className="font-semibold" htmlFor="breed">Raza:</label><br />
          <input className="w-64 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" id="breed" name="breed" value={breed} onChange={onInputChange}/>
        </li>
        <li>
          <label className="font-semibold" htmlFor="age">Edad:</label><br />
          <input className="w-64 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" inputMode='numeric' id="age" name="age" value={age} onChange={onInputChange}/>
        </li>
        <li>
          <label className="font-semibold" htmlFor="weight">Peso:</label><br />
          <input className="w-64 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" inputMode='numeric' id="weight" name="weight" value={weight} onChange={onInputChange}/>
        </li>
      </ul> 
      </div>
      <button className="bg-orange text-white rounded-lg px-6 py-2 mx-auto my-5 font-semibold shadow-lg" type="submit" onClick={onAdd}>AGREGAR</button> 
      <div className="flex w-10 h-10 rounded-full border-2  justify-center items-center font-bold text-xl hover:cursor-pointer absolute top-4 right-4" onClick={closeModal}><p></p>X</div>
    </form>
    </div>}
    
</>
  )
}
