import { Card } from "react-bootstrap";
import { Badge, Image } from "react-bootstrap";
import { format } from "date-fns";
import { ButtonStyled } from "./StyledComponents";
export const RequestCard = ({ request }) => {
  const fechaActual = new Date();
  return (
    <div>
      <Card
        style={{
          width: "45rem",
          height: "15rem",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        }}
        className="d-flex flex-column  "
      >
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-between">
            <div>
              <strong>Datos del propitario</strong>
              <div className="d-flex align-items-center gap-2 pt-2">
                <Image
                  onClick={() => console.log("click")}
                  src={
                    request.Posting?.OwnerPet?.image ||
                    "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
                  }
                  roundedCircle
                  width={70}
                  style={{
                    cursor: "pointer",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                  }}
                ></Image>
                <div>
                  <p>{request.Posting?.OwnerPet?.name}</p>
                  <p>{request.Posting?.OwnerPet.address}</p>
                  <p>{request.Posting?.OwnerPet.country}</p>
                </div>
              </div>

              <div className="pt-2">
                <strong>Duracion</strong>
                <p>
                  Del {format(request.Posting?.initialDate, "dd/MM/yyy")} al{" "}
                  {format(request.Posting.finalDate, "dd/MM/yyy")}
                </p>
              </div>
            </div>

            <div className="d-flex flex-column justify-center align-items-center gap-3">
              <strong>Fecha de solicitud</strong>
              <p>{format(request.createdAt, "dd/MM/yyyy")}</p>
              <Badge bg="info" className="mx-3">
                {request.status}
              </Badge>
            </div>
          </div>
          <div className="d-flex gap-3 justify-center">
            {request.status === "Aceptada" &&
              new Date(request.Posting.finalDate) < fechaActual && (
                <ButtonStyled>Calificar</ButtonStyled>
              )}
            {request.status === "Aceptada" &&
              new Date(request.Posting.finalDate) > fechaActual && (
                <ButtonStyled>Chat</ButtonStyled>
              )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
