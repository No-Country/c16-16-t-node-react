import { Image } from "react-bootstrap";

import { UserContext } from "../../context/UserContext";
import {
  ContenedorCarer,
  ContenedorNav,
  NavLinkStyled,
  NavStyled,
} from "./StyledComponents";
import { useContext } from "react";

export const NavCarer = () => {
  const cerrarSesion = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };
  const { userData } = useContext(UserContext);
  return (
    <ContenedorNav className="d-flex justify-content-between  ">
      <NavStyled>
        <div className="d-flex align-items-center pt-12 justify-content-around">
          <Image
            width={70}
            src={
              userData?.carer?.image ||
              "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
            }
            roundedCircle
          />
          <div className="d-flex flex-column">
            <strong>{userData?.carer?.name}</strong>
            <p
              style={{
                fontSize: "0.8rem",
                color: "black",
                fontWeight: "lighter",
              }}
            >
              {userData.email}
            </p>
          </div>
        </div>
        <hr />
        <NavLinkStyled className to="/carer/postings">
          <i className="bi bi-file-earmark-post"></i>
          Anuncios
        </NavLinkStyled>

        <NavLinkStyled to="/carer/request">
          <i className="bi bi-person-badge-fill"></i>
          Mis aplicaciones
        </NavLinkStyled>
        <NavLinkStyled to="/carer/ratings">
          <i className="bi bi-receipt-cutoff"></i>Mis reseñas
        </NavLinkStyled>
        <NavLinkStyled onClick={cerrarSesion}>
          <i className="bi bi-box-arrow-left"></i>Cerrar sesion
        </NavLinkStyled>
      </NavStyled>
    </ContenedorNav>
  );
};
