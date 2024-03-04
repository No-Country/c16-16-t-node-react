import { Route, Routes } from "react-router-dom";
import { Posting } from "./Posting";
import { Request } from "./Request";
import { PostingDetail } from "./PostingDetail";

export const CarerRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posting />} />
        <Route path="postings" element={<Posting />} />
        <Route path="postings/:id" element={<PostingDetail />} />
        <Route path="request" element={<Request />} />
      </Routes>
    </>
  );
};
