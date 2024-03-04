import { Card, Image } from "react-bootstrap";
import { ButtonStyled, ContenedorCarer } from "./StyledComponents";
import BG from "@assets/BG.png";
import { useLocation } from "react-router-dom";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { useState } from "react";
import { ModalMessages } from "./ModaMessages";
import { ModalImage } from "./ModalImage";

export const PostingDetail = () => {
  const [modalMessages, setModalMessages] = useState(false);
  const [modalImages, setModalImages] = useState(false);
  const location = useLocation();
  const post = location.state?.post;
  return (
    <ContenedorCarer style={{ backgroundImage: `url(${BG})` }}>
      <div
        className=" "
        style={{
          backgroundColor: "white",
          padding: "2rem",
          margin: "2rem",
          borderRadius: "10px",
        }}
      >
        <strong>Detalle del anuncio</strong>
        <Card
          style={{
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <div className="d-flex justify-content-between flex-wrap mb-3">
              <div>
                <Image src={post.OwnerPet.image} rounded width={50} />
                <i
                  className="bi bi-star-fill"
                  style={{
                    color: "#EEB800",
                  }}
                ></i>
                <i
                  className="bi bi-star-fill"
                  style={{
                    color: "#EEB800",
                  }}
                ></i>
                <i
                  className="bi bi-star-fill"
                  style={{
                    color: "#EEB800",
                  }}
                ></i>
                <p>{post.OwnerPet.name}</p>
                <p>
                  {post.OwnerPet.address}-{post.OwnerPet.city}
                </p>
                <p>{post.OwnerPet.country}</p>
              </div>
              <div className="d-flex gap-1">
                {post.OwnerPet.photos.map((image) => {
                  return (
                    <Image
                      key={image.id}
                      src={image.image}
                      onClick={() => setModalImages(true)}
                      rounded
                      style={{
                        width: "100px",
                        height: "100px",
                        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  );
                })}
              </div>
              <ModalImage
                show={modalImages}
                onHide={() => setModalImages(false)}
                images={post.OwnerPet.photos}
              />
            </div>

            <p>{post.description}</p>
            <div className="pb-4 pt-2">
              <strong>Fechas</strong>
              <p>
                Del {format(post.initialDate, "dd/MM/yyy")} al{" "}
                {format(post.finalDate, "dd/MM/yyy")}
              </p>
            </div>
            <hr />
            <div>
              <strong>Mascotas a cuidar</strong>

              <div className="d-flex flex-wrap gap-4 pt-3">
                {post.OwnerPet.pets.map((pet) => {
                  return (
                    <Image key={pet.id} src={pet.image} rounded width={50} />
                  );
                })}
              </div>
            </div>
            <div>
              <strong>Requisitos</strong>
              <p>
                El cuidador debe ser cuidadoso con los animales y tener la
                documentacion al dia.
              </p>
            </div>
            <div className="d-flex justify-end">
              <ButtonStyled onClick={() => setModalMessages(true)}>
                Aplicar
              </ButtonStyled>
              <ModalMessages
                show={modalMessages}
                onHide={() => setModalMessages(false)}
                postingId={post.id}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </ContenedorCarer>
  );
};
