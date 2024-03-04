import { Carousel, Modal } from "react-bootstrap";

export const ModalImage = (props) => {
  return (
    <div>
      <Modal {...props} size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Mi hogar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel
            style={{
              objectFit: "cover",
            }}
          >
            {props.images.map((image) => {
              return (
                <Carousel.Item key={image.id}>
                  <img
                    src={image.image}
                    alt="First slide"
                    style={{
                      width: "1000px",
                      height: "500px",
                      objectFit: "cover",
                    }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Modal.Body>
      </Modal>
    </div>
  );
};
