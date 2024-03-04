import styled from "@emotion/styled";
import { Button, Nav, Pagination } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const NavStyled = styled(Nav)(({ theme }) => ({
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "start",
  width: "400px",
  flexDirection: "column",
  gap: "20px",

  paddingTop: "2rem",
  paddingBottom: "2rem",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  height: "100vh",

  // background: " #D0CFD1 ",

  color: "#000",

  fontWeight: "bold",
}));

export const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  display: "flex",

  paddingTop: "0.8rem",

  gap: "5px",
  fontSize: "0.9rem",
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    color: "#48c8bb",
    // fontSize: "1.2rem",
  },

  borderRadius: "3px",
}));

export const ContenedorCarer = styled("div")(({ theme }) => ({
  height: "800px",
  backgroundColor: "white",
  paddingTop: "10px",
  margin: "0",
  overflow: "hidden",
  width: "880px",
}));

export const ContenedorNav = styled("div")(({ theme }) => ({
  height: "800px",
  backgroundColor: "white",
  padding: "0",
  margin: "0",
  overflow: "hidden",
  width: "880px",
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: "#48c8bb",
  color: "#fff",
  borderColor: "#48c8bb",
  "&:hover": {
    backgroundColor: "#48c8bb",
    color: "#fff",
  },
}));

export const PaginationStyle = styled(Pagination)(({ theme }) => ({
  justifyContent: "center",
}));

export const PagPrevStyle = styled(Pagination.Prev)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: "#48c8bb",
    borderRadius: "5px",
  },
}));
export const PagItemStyle = styled(Pagination.Item)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: "#48c8bb",
    borderRadius: "50%",
  },
  "&.active .page-link": {
    backgroundColor: "#48c8bb",
    color: "white",
  },
}));

export const PagEllipsisStyle = styled(Pagination.Ellipsis)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: "#48c8bb",
    borderRadius: "50%",
  },
}));

export const PagNextStyle = styled(Pagination.Next)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: "#48c8bb",
    borderRadius: "5px",
  },
}));
