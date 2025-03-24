// src/components/FormModal.js

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FormModal = ({ user, submitted, showModal, handleCloseModal }) => { 
// FormModal component takes four props: user, submitted, showModal, and handleCloseModal.
// user is the user object that contains the form data submitted to the API.
// submitted is a boolean that indicates whether the form has been submitted.
// showModal is a boolean that indicates whether the modal should be displayed.
// handleCloseModal is a function that closes the modal when called.
// The component renders a Modal component from react-bootstrap with a title, body, and a close button.
// If the form has been submitted, it displays the user data returned from the API in the modal body.
// The modal can be closed by clicking the close button.

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitted &&
            <>
              <p>Nice job!  Here is the information returned from the API:</p>
              <p><b>Name: </b>{user.name}</p>
              <p><b>Email: </b>{user.email}</p>
              <p><b>Phone: </b>{user.phone}</p>
              <p><b>Food: </b>{user.food}</p>
              <p><b>Communication: </b>{user.communication}</p>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormModal;