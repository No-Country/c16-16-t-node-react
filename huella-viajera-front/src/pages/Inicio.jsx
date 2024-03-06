import { Link } from "react-router-dom";


//Assets:
import inicioBG from '@assets/inicioBG.png'

export const Inicio = () => {
  return (
    <section className='flex justify-between gap-6'>
        <div className='w-full h-screen bg-cover bg-center' style={{ backgroundImage: `url(${inicioBG})`}}>
          <aside className='flex flex-col ml-24 mt-10 gap-6 w-[450px]'>
            <div className='w-full h-fit p-6 rounded-2xl'>
                <h1 className='font-bold text-6xl text-white'>Se un<br/>cuidador</h1>
                <p className='text-justify mt-3 mb-8 font-semibold text-white text-xl'>Disfuta de viajar y conocer nuevas culturas viviendo una experiencia única y enriquecedora junto a una mascota</p>
                <Link to={"/registro"} className='bg-orange text-white w-72 text-2xl font-semibold mx-auto py-3 px-9 rounded-full hover:shadow-lg'>Se un cuidador</Link>
            </div>
            <div className='w-full h-fit p-6 rounded-2xl'>
                <h1 className='font-bold text-6xl text-white'>Encuentra un<br/>cuidador</h1>
                <p className='text-justify mt-3 mb-8 font-semibold text-white text-xl'>PetStay te ayuda a encontrar el cuidador ideal para tu mascota, sal de vacaciones o por trabajo sin preocuparte por ello</p>
                <Link to={"/registro"} className='bg-orange text-white w-72 text-2xl font-semibold mx-auto py-3 px-9 rounded-full hover:shadow-lg'>Encuentra cuidador</Link>
            </div>
          </aside> 
        </div> 
    </section>
  )
}
