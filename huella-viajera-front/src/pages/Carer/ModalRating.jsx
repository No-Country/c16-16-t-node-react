import { Form, Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { ButtonStyled } from "./StyledComponents";
import axios from "axios";
import Swal from "sweetalert2";

export function ModalRating(props) {
  const url = "https://huellaviajera.onrender.com/";
  const token = sessionStorage.token;
  const [mensajeContenido, setMensajeContenido] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setMensajeContenido(event.target.value);
  };
  const handleRatingChange = (event) => {
    // Maneja el cambio de valor de la calificación
    const value = parseInt(event.target.value);
    setRating(value);
  };

  const sentMessages = async (event) => {
    try {
      const response = await axios.post(
        `${url}api/v1/ratings/`,
        {
          value: rating,
          comment: mensajeContenido,
          ownerPetId: props.ownerPetId,
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
          title: "Has calificado con exito!, Gracias por tu opinion!",
          showConfirmButton: true,
          timer: 3500,
        }).then((result) => {
          if (result.isConfirmed) {
            props.onHide();
            navigate("/carer/request");
          }
        });
      }
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No pudimos calificar!",
      });
    }
  };

  return (
    <Modal {...props} centered size="lg">
      <Modal.Header closeButton className="bg-secondary-subtle">
        <Modal.Title className="fw-bold">Califica a tu Anfitrion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error && <span>{"Error"}</span>}

          {!error && (
            <Form.Group className="d-flex mb-3 align-items-center flex-column">
              {/* aqui campo para calificar de 1 a 5 estrellas */}
              <p className="mb-3">Dale desde 1 a 5 estrellas a tu anfitrion</p>
              <div className="mb-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Form.Check
                    inline
                    label={value}
                    name="rating"
                    type="radio"
                    id={`inline-rating-${value}`}
                    key={value}
                    value={value}
                    checked={rating === value}
                    onChange={handleRatingChange}
                  />
                ))}
              </div>

              <Form.Control
                className="ms-3"
                as="textarea"
                rows={5}
                placeholder="Escribe un comentario sobre tu experiencia con el cuidador, su mascota y el hogar"
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
