import BG from "@assets/BG.png";

import { ContenedorCarer } from "./StyledComponents";
import { PostingCard } from "./PostingCard";
import { useState } from "react";
import { Paginator } from "./Paginator";
import { usePostings } from "../../domain/usePostings";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export const Posting = () => {
  const { data, loading, error } = usePostings();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsBypage, setPostsByPage] = useState(3);
  const totalPostings = data.length;
  const lastIndex = currentPage * postsBypage;
  const firstIndex = lastIndex - postsBypage;

  const viewPosting = (post) => {
    navigate(`/carer/postings/${post.id}`, { state: { post } });
  };
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
        <strong>Anuncios</strong>
        <hr />
        {loading && <Spinner animation="border" variant="info" />}
        {error && <p>{error}</p>}
        {data &&
          data
            .map((posting) => {
              return (
                <PostingCard
                  key={posting.id}
                  post={posting}
                  viewPosting={viewPosting}
                />
              );
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
