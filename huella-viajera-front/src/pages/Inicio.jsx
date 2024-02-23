
//Assets:
import Fotolanding from '../assets/foto_landing.jpg'

export const Inicio = () => {
  return (
    <section className='flex justify-between gap-6'>
        <div className='w-full my-6 h-screen relative'>
          <img className='h-full w-full object-cover' src={Fotolanding} alt="landing" />
          <aside className='flex flex-col ml-10 mt-4 gap-6 w-[450px] absolute top-0'>
            <div className='w-full h-fit p-6 rounded-2xl'>
                <h1 className='font-bold text-6xl text-white'>Se un<br/>cuidador</h1>
                <p className='text-justify mt-2 mb-6 font-semibold text-white text-xl'>Texto de como funciona y que tenes que hacer para ser un cuidador. Podes viajar y conocer LATAM bla bla bla</p>
                <button className='bg-orange text-white w-72 text-2xl font-semibold mx-auto py-4 px-9 rounded-full hover:shadow-lg'>Se un cuidador</button>
            </div>
            <div className='w-full h-fit p-6 rounded-2xl'>
                <h1 className='font-bold text-6xl text-white'>Encuentra un<br/>cuidador</h1>
                <p className='text-justify mt-2 mb-6 font-semibold text-white text-xl'>Texto de como funciona y que tenes que hacer para encontrar un cuidador. Podes viajar tranquilo sin preocuparte por dejarlos solos.</p>
                <button className='bg-orange text-white w-72 text-2xl font-semibold mx-auto py-4 px-9 rounded-full hover:shadow-lg'>Encuentra cuidador</button>
            </div>
          </aside> 
        </div> 
    </section>
  )
}
