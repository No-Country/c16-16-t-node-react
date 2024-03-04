import { Navigate } from "react-router-dom";
import { NavCarer } from "./NavCarer";
import { Button, Card } from "react-bootstrap";
import { CarerRouter } from "./CarerRouter";

export const Carer = () => {
  let token = sessionStorage.getItem("token");

  return (
    <>
      {token ? (
        <div className="d-flex  ">
          <NavCarer />
          <div
            style={{
              height: "100vh",
            }}
          >
            <CarerRouter />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
