import { Badge, Card, Image } from "react-bootstrap";
import { ButtonStyled } from "./StyledComponents";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const PostingCard = ({ post, viewPosting }) => {
  const { userData } = useContext(UserContext);
  console.log(userData);
  const viewDetail = () => {
    viewPosting(post);
  };

  const verifyMyRequest = () => {
    const id = userData?.carer?.id;
    console;
    const result = post.requests.some((request) => {
      return request.carerId === id;
    });

    return result;
  };
  return (
    <div>
      <Card
        style={{
          width: "45rem",
          height: "11rem",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        }}
        className="d-flex flex-column  "
      >
        <div>
          <Card.Body className="d-flex gap-4 align-items-center">
            <Image
              width={70}
              src={
                post.OwnerPet.image ||
                "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
              }
              roundedCircle
            />
            <div>
              <strong>
                {" "}
                Hace{" "}
                {formatDistanceToNow(new Date(post.createdAt), { locale: es })}
              </strong>
              <div>
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
              </div>
              <Card.Text
                style={{
                  width: "500px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {post.description}
              </Card.Text>
              <Card.Text
                style={{
                  width: "500px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Badge bg="secondary">{post.requests.length} solicitudes</Badge>
                <Badge bg="info" className="mx-3">
                  {verifyMyRequest() ? "Ya aplicaste" : null}
                </Badge>
              </Card.Text>
            </div>
          </Card.Body>
        </div>

        <div className="d-flex justify-center">
          <ButtonStyled onClick={viewDetail}>Ver detalle</ButtonStyled>
        </div>
      </Card>
    </div>
  );
};
