import { Link } from "react-router-dom"

//Assets:
import Logo from '../../assets/logo.jpg'

export const Header = () => {
  return (
    <div className="bg-cyan px-10 h-28 font-sand font-semibold flex justify-between items-center">
        
          <img className="h-36 mt-8" src={Logo} alt="Logo Huellitas" />
          <ul className="flex gap-8 mr-12 hover:cursor-pointer">
            <Link to="/" className="hover:border-b text-white text-xl">Inicio</Link>
            <li className="hover:border-b text-white text-xl">Como funciona</li>
            <li className="hover:border-b text-white text-xl">Se un cuidador</li>
            <li className="hover:border-b text-white text-xl">Encuentra cuidador</li>
            <li className="hover:border-b text-white text-xl">Ayuda</li>
          </ul>
        
        <div className="flex gap-5">
        <Link to="/ingresar" className=" bg-white text-gray-text text-xl py-2 px-4 rounded-full hover:shadow-lg">Inicia Sesión</Link>
        <Link to="/registro" className=" bg-orange text-white text-xl py-2 px-4 rounded-full hover:shadow-lg">Crea tu cuenta</Link>
        </div>
      </div>
  )
}
