import { useEffect, useState } from "react"
import { useForm } from "../../hooks/useFormData"
import axios from "axios"



export const Posting = () => {

  const {formState, onInputChange, onResetForm, title, description, initialDate, finalDate} = useForm()
  const [pets, setPets] = useState([])
  const [posts, setPosts] = useState([])
  const [modal, setModal] = useState(false)
  const [reqModal, setReqModal] = useState(false)
  const [activeRequest, setActiveRequest] = useState({})


//Modal de Agregar Anuncio
  const openModal = () => {
    setModal(true)
   }
   const closeModal = () => {
    onResetForm()
    setModal(false)
   }

//Modal de Request
  const openReqModal = (e) => {
    const allRequests = []
    posts.map((post) => {
    post.requests.map((req) => {
      allRequests.push(req)
    })
   })
   const active = allRequests.filter((req) => req.id == e.target.id)
   console.log(active)
  //  const activeReq = active[0]
   setActiveRequest(active[0])
   console.log(activeRequest)
   setReqModal(true)

  }
  const closeReqModal = () => {
    console.log("close")
    setReqModal(false)
      // onResetForm()
  }

   useEffect(() => {

    async function getAllPets() {
    
      const urlPets = "https://huellaviajera.onrender.com/api/v1/pets"
      const token = sessionStorage.token
    
        try {
    
          const responsePost = await axios.get(urlPets, 
          {headers: {
            'Authorization': `Bearer ${token}`
            }
          });
          setPets(responsePost.data.data)
         
        } catch (error) {
          console.error(error);
        } 
      }
      getAllPets()
    
      async function getPosting() {
    
        const urlPosts = "https://huellaviajera.onrender.com/api/v1/posting"
        const token = sessionStorage.token
    
        try {
          const responseGet = await axios.get(`${urlPosts}/getAll`, 
            {headers: {
              'Authorization': `Bearer ${token}`
              }
            });
            console.log(responseGet)
            setPosts(responseGet.data.data)
        } catch (error) {
          console.error(error);
        }
      }
      getPosting()

   }, [])
   

//AGREGAR POSTEO - LUEGO DE COMPLETAR EL MODAL

const onAdd = (e) => {
  e.preventDefault()

  const urlPosts = "https://huellaviajera.onrender.com/api/v1/posting"
  const token = sessionStorage.token
  
  const formdata = formState
  formdata.initialDate = `${formdata.initialDate}:00.000Z`
  formdata.finalDate = `${formdata.finalDate}:00.000Z`
  console.log(formdata)

  onResetForm()

  async function postPosting() {
    try {
      const responsePost = await axios.post(`${urlPosts}/new`, formdata, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
      console.log(responsePost)
      const responseGet = await axios.get(`${urlPosts}/getAll`, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
        console.log(responseGet)
        setPosts(responseGet.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  postPosting()

  onResetForm()
  closeModal()
 }

 //ELIMINAR POSTEO

const onDelete = (e) => {

  const urlPosts = "https://huellaviajera.onrender.com/api/v1/posting"
  const postId = e.target.id
  const token = sessionStorage.token

  async function deletePosting() {
    try {
      const responseDelete = await axios.delete(`${urlPosts}/${postId}`, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
      console.log(responseDelete)
      const responseGet = await axios.get(`${urlPosts}/getAll`, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
        console.log(responseGet)
        setPosts(responseGet.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  deletePosting()
 }

 const StarRating = ({ value }) => {
  const stars = [];
  for (let i = 0; i < value; i++) {
    stars.push(
      <i
        key={i}
        className="bi bi-star-fill"
        style={{
          color: "#EEB800",
        }}
      ></i>
    );
  }
  return <div className="w-20">{stars}</div>;
};

//ACEPTAR REQUEST

const onAccept = (e) => {

  console.log(e.target.id)
  const urlReq = "https://huellaviajera.onrender.com/api/v1/request"
  const urlPosts = "https://huellaviajera.onrender.com/api/v1/posting"
  const reqId = e.target.id
  const token = sessionStorage.token
  const change = {"status":"Aceptada"}


  async function editRequest() {
    try {
      const responsePut = await axios.put(`${urlReq}/${reqId}`, change,
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
      console.log(responsePut)
      const responseGet = await axios.get(`${urlPosts}/getAll`, 
        {headers: {
          'Authorization': `Bearer ${token}`
          }
        });
        console.log(responseGet)
        setPosts(responseGet.data.data)
        closeReqModal()
    } catch (error) {
      console.error(error);
    }
  }
  editRequest()
}

const stars = () => {
  const total = activeRequest.Carer.ratings.reduce((acc, rating) => acc + rating.value, 0);
  const result = total / activeRequest.Carer.ratings.length;
  return result
}

const reverseString = (string) => {
    const splitString = string.split("-")
    const reverseArray = splitString.reverse()
    const joinArray = reverseArray.join("-")
    return joinArray
}


  return (

  <>
  <div className=" bg-white rounded-3xl px-12 py-6 w-full shadow-lg">

      <h1 className="text-2xl font-bold mb-4">Mis Anuncios</h1>
      <div className='flex-col space-y-8'>

      {posts.map((post) => {
        const reverseString = (string) => {
          const splitString = string.split("-")
          const reverseArray = splitString.reverse()
          const joinArray = reverseArray.join("-")
          return (joinArray)
        }


        // async function getRequest() {
    
        //   const urlRequest = "https://huellaviajera.onrender.com/api/v1/request"
        //   const token = sessionStorage.token
      
        //   try {
        //     console.log(`${urlRequest}/:${post.id}`)
        //     const responseGet = await axios.get(`${urlRequest}/:${post.id}`, 
        //       {headers: {
        //         'Authorization': `Bearer ${token}`
        //         }
        //       });
              
        //       const request = responseGet.data.data
        //       console.log(request)
        //   } catch (error) {
        //     console.error(error);
        //   }
        // }
        // getRequest()



        
          return(
        <div className="flex justify-between h-fit border rounded-2xl p-6 my-4 shadow-lg" key={post.id}>
          
          <div className="flex-col items-center justify-around">
            <h1 className="text-2xl font-semibold">{post.title}</h1>
            <p className="text-md my-2">Desde <span className="font-semibold">{reverseString(post.initialDate.slice(0,10))}</span> hasta <span className="font-semibold">{reverseString(post.finalDate.slice(0,10))}</span></p>
            <p className="my-2">{post.description}</p>
            <div className="flex-col mb-4">
              <h1 className="mt-8 mb-4 font-bold">Aplicantes:</h1>
              
              
              <div className="flex gap-3">
              {post.requests.map((req) => {



  const total = req.Carer.ratings.reduce((acc, rating) => acc + rating.value, 0);
  const result = total / req.Carer.ratings.length;
  

              return(
                <div className={`flex-col w-[150px] p-2 m-2 hover:cursor-pointer rounded-xl ${req.status == "Aceptada" && "bg-green bg-opacity-20" }`} key={req.id} id={req.Carer.id}>
                  <div className="border w-16 h-16 rounded-full mx-auto bg-cover bg-center" style={{ backgroundImage: `url(${req.Carer.image})`}} id={req.id} onClick={openReqModal}></div>
                  <h1 className="text-sm text-center font-semibold">{req.Carer.name}</h1>
                  <div className="flex w-full justify-center h-6"><StarRating value={result}/></div>
                  <div className={`text-white text-center w-24 rounded-full mx-auto mt-2 ${req.status ==="pending" ? "bg-gray-600" : "bg-orange"}`} >{req.status ==="pending" ? "Pendiente" : req.status}</div>
                </div>
                )})}

              </div>

            </div>
          </div>

          <div className="w-16 flex-col">
            <span className="mx-auto flex w-10 h-10 rounded-full border-2  justify-center items-center font-bold text-xl hover:cursor-pointer" id={post.id} onClick={onDelete}><p></p>X</span>
            <div>
              <span className="flex font-semibold text-lg mt-60 hover:font-bold hover:cursor-pointer" name="edit">Editar</span>
            </div>
          </div>

        </div>
          )})}

        <button className="px-6 pb-1 rounded-2xl text-gray-font border border-gray-font mx-auto flex items-center gap-2 shadow-lg font-semibold"><span className="text-xl" onClick={openModal}>Agregar</span><span className="text-3xl">+</span></button>
      </div>
    </div>

    {modal && 
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
    <form onSubmit={onAdd} className="flex flex-col w-[800px] h-fit mx-auto rounded-3xl shadow-2xl px-16 bg-white relative">
      <h1 className="mx-auto font-bold text-2xl my-5">Nuevo Anuncio</h1>
      <div className="flex items-center justify-evenly">
      <ul className="p-4 w-full">
        <li>
          <label className="font-semibold text-lg" htmlFor="title">Titulo:</label><br />
          <input className="w-1/2 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" id="title" name="title" value={title} onChange={onInputChange}/>
        </li>
        <li>
          <label className="font-semibold text-lg" htmlFor="description">Información sobre el anuncio y la casa:</label><br />
          <textarea className="w-full h-24 rounded-lg px-2 py-1 my-1 bg-gray-300" type="text" id="description" name="description" value={description} onChange={onInputChange}/>
        </li>
        <div>
          <h1 className="font-semibold text-lg">Período:</h1>
          <div className="flex gap-20 py-1 my-1 justify-center">
            <div>
              <label className="font-normal mr-2" htmlFor="initialDate">Desde:</label>
              <input className="w-48 rounded-lg px-2 py-1 my-1 bg-gray-300" type="datetime-local" id="initialDate" name="initialDate" value={initialDate} onChange={onInputChange}/>
            </div>
            <div>
              <label className="font-normal mr-2" htmlFor="finalDate">Hasta:</label>
              <input className="w-48 rounded-lg px-2 py-1 my-1 bg-gray-300" type="datetime-local" id="finalDate" name="finalDate" value={finalDate} onChange={onInputChange}/>
            </div>
          </div>
        </div>
        <div>
        <h1 className="font-semibold text-lg">Mascotas:</h1>
          <div className="flex ">
          {pets.map((pet, idx) => {
              return(
                <div className="flex-col items-center rounded-2xl p-4 justify-between" key={idx}>
                  <div className= "w-20 h-20 bg-cover bg-center shadow-lg rounded-lg" style={{ backgroundImage: `url(${pet.image})`}}></div>
                  <h1 className="text-sm text-center font-semibold mt-2">{pet.name}</h1>
                </div>)})}
          </div>
        </div>
      </ul> 
      </div>
        

      <button className="bg-orange text-white rounded-lg px-6 py-2 mx-auto mb-8 font-semibold shadow-lg" type="submit">AGREGAR</button><br />
      <div className="flex w-10 h-10 rounded-full border-2  justify-center items-center font-bold text-xl hover:cursor-pointer absolute top-4 right-4" onClick={closeModal}><p></p>X</div>
    </form>
    </div>}

    {reqModal &&
                  <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" >
                    <div className="flex flex-col w-[800px] h-fit mx-auto rounded-3xl shadow-2xl px-16 py-4 gap-4 bg-white relative">
                      <div className="flex gap-4 ">
                        <div className=" flex-col text-center">
                          <div className="w-40 h-40 rounded-lg bg-cover bg-center mb-2" style={{ backgroundImage: `url(${activeRequest.Carer.image})`}}></div>
                          <div className="flex w-full justify-center"><StarRating value={stars()} /></div>
                        </div>
                        <div className="w-3/4">
                          <h1 className="text-2xl font-semibold">{activeRequest.Carer.name}</h1>
                          <h1 className="text-md py-2">{activeRequest.message}</h1>
                        </div>
                      </div>
                        <div className="mb-4">
                          <h1 className="mb-2 text-lg font-semibold">Reseñas:</h1>
                          <div>
                          {
                          activeRequest.Carer.ratings.map((rat) => {

                            return(
                            <div className="flex gap-2" key={rat.id}>
                              <StarRating value={rat.value}/>
                              <p>{rat.comment}</p>
                              <span className="font-semibold">({reverseString(rat.createdAt.slice(0,10))})</span>
                            </div>

                          )})
                          }
                          </div>
                        </div>
                      
                      <button className="bg-orange text-white rounded-lg px-6 py-2 mx-auto font-semibold shadow-lg" id={activeRequest.id}  onClick={onAccept}>Aceptar</button>
                      <div className="flex w-10 h-10 rounded-full border-2  justify-center items-center font-bold text-xl hover:cursor-pointer absolute top-4 right-4" onClick={closeReqModal}>X</div>
                    </div>

                  </div>}

    

    </>
  )
}
