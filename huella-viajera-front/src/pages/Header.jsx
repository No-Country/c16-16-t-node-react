import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import logo from "../assets/logo.jpg";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { userData, setUserData, setItemSelected } = useContext(UserContext);

  const sessionClose = () => {
    setItemSelected("profile");
    setUserData({});
    setIsOpen(false);
    sessionStorage.setItem("token", "");
  };

  const selected = (e) => {
    setItemSelected(e.target.id);
    setIsOpen(false);
  };

  return (
    <div className="bg-cyan h-28 flex shadow-lg drop-shadow-lg relative z-50">
      <div className="w-[350px]">
        <img
          className="h-36 w-56 bg-logo bg-center shadow-lg mx-auto"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="pr-10 font-semibold flex justify-between items-center gap-24 text-lg">
        <ul className="flex gap-8 mr-24 hover:cursor-pointer">
          <li className="hover:border-b text-white ">Como funciona</li>
          <li className="hover:border-b text-white ">Ser cuidador</li>
          <li className="hover:border-b text-white ">
            Encontrar cuidador
          </li>
          <li className="hover:border-b text-white ">Ayuda</li>
        </ul>

        {Object.keys(userData).length === 0 ? (
          <div className="flex gap-5">
            <Link
              to="/ingresar"
              className=" bg-white text-gray-text py-2 px-4 rounded-full hover:shadow-lg"
            >
              Inicia Sesión
            </Link>
            <Link
              to="/registro"
              className=" bg-orange text-white py-2 px-4 rounded-full hover:shadow-lg"
            >
              Crea una cuenta
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div className=" p-2 rounded-lg  flex items-center gap-4">
              <h1 className="text-white hover:cursor-default">
                {userData.role === "ownerPet"
                  ? userData.ownerPet.name
                  : userData.carer.name}
              </h1>
              <div
                className="w-16 h-16 rounded-full bg-cover bg-center shadow-lg hover:cursor-pointer hover:border-2 hover: border-white"
                style={{
                  backgroundImage: `url(${
                    userData.role === "carer"
                      ? userData.carer.image
                      : userData.ownerPet.image
                  })`,
                }}
                onClick={() => setIsOpen((prev) => !prev)}
              ></div>
            </div>

            {isOpen && (
              <div className="absolute w-full top-28">
                <div className="h-10 rounded-xl bg-white border border-gray-300 shadow-lg flex justify-between items-center p-4 text-xs text-gray-600 hover:cursor-default">
                  <h1 className=" font-normal">
                    {userData.role === "ownerPet"
                      ? "Dueño de Mascotas"
                      : "Cuidador"}
                  </h1>
                  <div className="flex gap-3 items-center">
                    <p className="font-thin">En Linea</p>
                    <div className="rounded-full h-4 w-4 bg-green border border-gray-600"></div>
                  </div>
                </div>

                <div className="bg-white absolute w-full right-0 p-8 mt-2 flex flex-col justify-center gap-4 rounded-lg text-left shadow-lg hover:cursor-default">
                  <div>
                    <h1>Mi Perfil</h1>
                    <p
                      className="text-sm font-normal hover:cursor-pointer"
                      id="profile"
                      onClick={selected}
                    >
                      Ver
                    </p>
                  </div>
                  <div>
                    <h1>Anuncios</h1>
                    <p
                      className="text-sm font-normal hover:cursor-pointer"
                      id="posting"
                      onClick={selected}
                    >
                      Mis anuncios
                    </p>
                  </div>

                  <h1
                    className="font-bold hover:cursor-pointer mt-4"
                    onClick={sessionClose}
                  >
                    Cerrar Sesion
                  </h1>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
