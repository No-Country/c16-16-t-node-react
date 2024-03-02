
export const Posting = () => {

  return (
  <div className=" bg-white rounded-3xl px-12 py-6 w-full shadow-lg">

      <h1 className="text-2xl font-bold mb-4">Mis Anuncios</h1>
      <ul className=" flex text-left gap-4 mb-2">
        <li className=" font-bold mb-2 text-end hover:cursor-pointer">Activos</li>
        <li className=" font-bold mb-2 text-end hover:cursor-pointer">Finalizados</li>
      </ul>
      <div className='flex-col space-y-8'>
      
        <div className="h-40 flex items-center border rounded-2xl p-6 mb-2 justify-around shadow-lg">
          <button className="px-6 rounded-3xl text-gray-font border border-gray-font mx-auto">Ver más</button>
        </div>
        {/* {pets.map((pet, idx) => {
          return(
            <div className="flex items-center border-2 rounded-2xl p-6 justify-around" key={idx}>
              <div className= "w-40 h-40 bg-[url('src/assets/foto_registro.jpg')] bg-cover"></div>
              <ul className="text-lg columns-2 gap-20">
                <li><span className='text-xl font-bold'>Nombre:</span><br />name</li>
                <li><span className='text-xl font-bold'>Tipo:</span><br />type</li>
                <li><span className='text-xl font-bold'>Raza:</span><br />breed</li>
                <li><span className='text-xl font-bold'>Edad:</span><br />age</li>
                <li><span className='text-xl font-bold'>Peso:</span><br />weight</li>
              </ul>
              <div className="flex flex-col gap-6">
                <button className="font-bold bg-gray-500 px-8 py-1 rounded-2xl">EDITAR</button>
                <button className="font-bold bg-gray-500 px-8 py-1 rounded-2xl">ELIMINAR</button>

              </div>
            </div>
        )})} */}
        <button className="px-6 pb-1 rounded-2xl text-gray-font border border-gray-font mx-auto flex items-center gap-2 shadow-lg font-semibold"><span className="text-xl">Agregar</span><span className="text-3xl">+</span></button>
      </div>              
    </div>
  )
}
