import { useEffect, useState } from "react"

export const UploadImage = ({onInputChange}) => {

    //Logica para vista previa de imagen al cargarla
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  


    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        onInputChange(e)
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        console.log(e.target.files[0])
        setSelectedFile(e.target.files[0])
    }

  return (
    <div className="flex flex-col p-4">
        <div className="h-60 mb-8">
        {selectedFile &&  <img className="w-60 h-60 my-4 mx-auto object-cover shadow-lg" src={preview} alt="Foto de la Mascota" />}
        </div>
         
        <label className="font-semibold text-center my-1" htmlFor="imagePet">Selecciona la foto a subir:</label>
        <input  className="" type="file" id="imagePet" name="image" onChange={onSelectFile}/>
        
    </div>
  )
}
