import { Route, Routes } from "react-router-dom";
import { Posting } from "./Posting";
import { Request } from "./Request";
import { PostingDetail } from "./PostingDetail";
import { Ratings } from "./Ratings";
import { OwnerDetails } from "./OwnerDetails";
import { Prueba } from "./Prueba";

export const CarerRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posting />} />
        <Route path="postings" element={<Posting />} />
        <Route path="postings/:id" element={<PostingDetail />} />
        <Route path="profileOwner/:id" element={<OwnerDetails />} />

        <Route path="request" element={<Request />} />
        <Route path="ratings" element={<Ratings />} />
      </Routes>
    </>
  );
};
