import { useState } from "react"

export const Cares = () => {
  
  //Estados botones "Activo" y "Finalizado"
  const [isActive, setIsActive] = useState("")

  return (
    <>
    <div className=" bg-white rounded-3xl px-12 py-6 w-full shadow-lg">
  
        <h1 className="text-2xl font-bold mb-4">Mis Cuidados Recibidos</h1>
        <ul className=" flex text-left gap-4 mb-2 border-t border-gray-200">
          <li className={`font-bold mb-2 text-end hover:cursor-pointer ${isActive=="Activos" ? "text-pink border-t border-pink" : "" }`} onClick={() => {setIsActive("Activos")}}>Activos</li>
          <li className={`font-bold mb-2 text-end hover:cursor-pointer ${isActive=="Finalizados" ? "text-pink border-t border-pink" : "" }`} onClick={() => {setIsActive("Finalizados")}}>Finalizados</li>
        </ul>
        <div className='flex-col space-y-8'>
  
          <div className="h-fit flex-col items-center border rounded-2xl p-6 mb-2 justify-around shadow-lg">
            <h1 className="text-2xl font-semibold">Visita Colombia mientras cuidas a un adorable gato siamés</h1>
            <p className="text-md my-2">Desde 01-03-2024 hasta 15-03-2024</p>
            <div className="flex-col mb-4">
              <h1 className="mt-8 mb-4 font-bold">Cuidador:</h1>
              <div className="flex gap-3">
                 <div className="flex-col w-[150px] p-2 hover:cursor-pointer">
                  <div className="border w-16 h-16 rounded-full mx-auto"></div>
                  <h1 className="text-sm text-center font-semibold">Nombre y Apellido</h1>
                 </div>
              </div>
            </div>
            <button className="flex px-6 rounded-3xl text-gray-font border border-gray-font mx-auto">Ver puntuacion recibida</button>
          </div>
          </div>
      </div>
      </>
    )
}
