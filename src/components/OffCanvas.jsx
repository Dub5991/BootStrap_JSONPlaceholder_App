// src/components/Offcanvas.js

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const OffCanvas = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false); // set the initial state of the offcanvas to false

  const handleCloseOffcanvas = () => setShowOffcanvas(false); // function to close the offcanvas
  const handleShowOffcanvas = () => setShowOffcanvas(true); // function to show the offcanvas

  return (
    <>
      <Button variant="link" onClick={handleShowOffcanvas} className='mt-5 text-decoration-none'>
        🤔 Why fill out this form❓
      </Button>

      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Why?</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Because this form is life-changing and will blow your mind 🤯</p>
          <p>That is why❗</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvas;