import { Form, Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { ButtonStyled } from "./StyledComponents";
import axios from "axios";
import Swal from "sweetalert2";

export function ModalMessages(props) {
  const url = "http://localhost:3000/";
  const token = sessionStorage.token;
  const [mensajeContenido, setMensajeContenido] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setMensajeContenido(event.target.value);
  };

  const sentMessages = async (event) => {
    event.preventDefault();

    try {
      console.log("try");
      const response = await axios.post(
        `${url}api/v1/request/new`,
        {
          message: mensajeContenido,
          postingId: props.postingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        // aleerta de sweet alert
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Has aplicado con exito!, espera la respuesta del dueño del anuncio",
          showConfirmButton: true,
          timer: 1500,
        });
        navigate("/carer/postings");
      }
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No pudimos aplicar, intenta mas tarde!",
      });
    }
  };

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Aplicar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error && <span>{"Error"}</span>}

          {!error && (
            <Form.Group className="d-flex mb-3 align-items-center">
              <Form.Control
                className="ms-3"
                as="textarea"
                rows={3}
                placeholder="Escribe tu mensaje aqui de la forma mas detallada posible"
                value={mensajeContenido}
                onChange={handleInputChange}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-secondary-subtle">
        {!error && <ButtonStyled onClick={sentMessages}>Enviar</ButtonStyled>}
      </Modal.Footer>
    </Modal>
  );
}
