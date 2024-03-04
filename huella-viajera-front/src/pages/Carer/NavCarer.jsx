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
  const { userData } = useContext(UserContext);
  return (
    <ContenedorNav className="d-flex justify-content-between  ">
      <NavStyled>
        <div className="d-flex align-items-center pt-12 justify-content-around">
          <Image
            width={70}
            src="https://res.cloudinary.com/dppqkypts/image/upload/v1702849125/imagesBlog/fcc30d17932e64190ad4289f41fd370f.jpg"
            roundedCircle
          />
          <div className="d-flex flex-column">
            <strong>{userData.carer.name}</strong>
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
        <NavLinkStyled to="facturas">
          <i className="bi bi-receipt-cutoff"></i>Mis reseñas
        </NavLinkStyled>
      </NavStyled>
    </ContenedorNav>
  );
};
