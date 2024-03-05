import { useRequests } from "../../domain/useRequest";
import { ContenedorCarer } from "./StyledComponents";
import BG from "@assets/BG.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Paginator } from "./Paginator";
import { RequestCard } from "./RequestCard";

export const Request = () => {
  const { data, loading, error } = useRequests();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsBypage, setPostsByPage] = useState(3);
  const totalPostings = data.length;
  const lastIndex = currentPage * postsBypage;
  const firstIndex = lastIndex - postsBypage;
  return (
    <ContenedorCarer style={{ backgroundImage: `url(${BG})` }}>
      <div
        className="d-flex flex-column flex-wrap gap-3  "
        style={{
          backgroundColor: "white",
          padding: "2rem",
          margin: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
        }}
      >
        <strong>Mis solicitudes</strong>
        <hr />
        {loading && <Spinner animation="border" variant="info" />}
        {error && <p>{error}</p>}
        {data &&
          data
            .map((request) => {
              return <RequestCard key={request.id} request={request} />;
            })
            .slice(firstIndex, lastIndex)}

        <Paginator
          byPage={postsBypage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={totalPostings}
        />
      </div>
    </ContenedorCarer>
  );
};
