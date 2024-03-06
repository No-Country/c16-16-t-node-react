import { ContenedorCarer } from "./StyledComponents";
import { Image, Spinner, Card } from "react-bootstrap";
import BG from "@assets/BG.png";

import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useProfileOwner } from "../../domain/useProfileOwner";

export const OwnerDetails = () => {
  const param = useParams();
  const { id } = param;
  const { data, loading, error } = useProfileOwner({ id });

  const StarRating = ({ value }) => {
    const stars = [];
    for (let i = 0; i < value; i++) {
      stars.push(
        <i
          key={i}
          className="bi bi-star-fill"
          style={{
            color: "#EEB800",
          }}
        ></i>
      );
    }
    return <div>{stars}</div>;
  };

  const calculateAverage = () => {
    if (data?.ratings?.length === 0) return 0;
    const total = data?.ratings?.reduce((acc, rating) => acc + rating.value, 0);
    return total / data?.ratings?.length;
  };
  return (
    <ContenedorCarer style={{ backgroundImage: `url(${BG})` }}>
      <div
        className="d-flex flex-column flex-wrap gap-3  "
        style={{
          height: "100%",
          backgroundColor: "white",
          padding: "2rem",
          margin: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
        }}
      >
        <strong>Reseñas del Anfitrion</strong>
        <div className="d-flex align-items-center gap-4">
          <Image
            width={100}
            src={
              data?.image ||
              "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
            }
            roundedCircle
          />
          <div>
            <strong>{data?.name}</strong>
            <StarRating value={calculateAverage()} />
            <p>{}</p>
          </div>
        </div>
        <hr />
        <div className="pt-3 mb-3">
          <strong>({data?.ratings?.length} ) Comentarios</strong>
        </div>
        {loading && <Spinner animation="border" variant="info" />}
        {error && <p>{error}</p>}
        {data &&
          data?.ratings?.map((rating) => {
            return (
              <Card
                key={rating.id}
                style={{
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <Image
                      width={30}
                      src={
                        rating.Carer.image ||
                        "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
                      }
                      roundedCircle
                    />
                    <p>{rating.Carer?.name}</p>
                  </Card.Title>
                  <Card.Text>
                    {format(rating.createdAt, "dd/MM/yyyy")}
                  </Card.Text>
                  <Card.Text>
                    <StarRating value={rating.value} />
                  </Card.Text>

                  <Card.Text>{rating.comment}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </ContenedorCarer>
  );
};
