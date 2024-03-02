
export const Home = () => {
  return (
<div className=" bg-white rounded-3xl px-12 py-6 w-full shadow-lg">

  <h1 className="text-2xl font-bold">Mi Hogar</h1>
  <div className='py-4'>
    <div className="flex justify-start items-center gap-8">
      <div className="w-64 h-64 bg-[url('src/assets/foto_registro.jpg')] bg-cover shadow-lg"></div>
      <ul className='text-lg columns-2 gap-20 space-y-4'>
        <li><span className='text-xl font-semibold'>DIRECCIÓN:</span><br />---</li>
        <li><span className='text-xl font-semibold'>CIUDAD:</span><br />---</li>
        <li><span className='text-xl font-semibold'>PAÍS:</span><br />---</li>
        <li><span className='text-xl font-semibold'>CP:</span><br />---</li>
      </ul>
    </div>
    <h1 className='text-lg text-justify mt-4'><span className='text-xl font-bold'>SOBRE NUESTRO HOGAR:</span><br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, neque eos quas quo veniam animi dolore sunt repellat expedita? Distinctio deserunt quaerat officia blanditiis tempora ab, doloribus voluptatum labore necessitatibus.</h1>
  </div>

</div>
)
}