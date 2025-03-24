// src/components/UserForm.js

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormModal from './FormModal';
import OffCanvas from './OffCanvas';
import axios from 'axios';

const UserForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    food: '',
    communication: '',
  });

  const [submitted, setSubmitted] = useState(false); // it's set to false at first because the form is not submitted yet
  const [user, setUser] = useState(null); // it's set to null at first because we don't have any user yet
  const [error, setError] = useState(null); // it's set to null at first because we don't have any error yet
  
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const [validated, setValidated] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // spread the existing formData into this new object
      // then update the key that matches the name attribute of the input that triggered this function
      [name]: value // set the value of the key to the value of the input that triggered this function
    });
  };

  const handleSubmit = async (e) => { // async function to handle form submission
    e.preventDefault(); // prevent the default form submission, which would cause the page to refresh

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {

    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
        console.log(response.data);  // log the response data to the console
        setUser(response.data);      // set the user state to the response data
        setSubmitted(true);          // set submitted to true to display the success alert
        setShowModal(true);          // set showModal to true to display the modal
        setError(null);              // clear any existing errors
      } catch (err) {                // if there is an error
        setError(`Error submitting the form. Please try again: ${err.message}`); // set the error state to the error message
        setSubmitted(false);         // set submitted to false
      }
    }
    setValidated(true);
  };
    //After the form is submitted, and the API call is done, we will setShowModal to true which will display the Modal to the page.
    //If there is an error, we will setError to the error message and setSubmitted to false.
    //If there is no error, we will setUser to the response data and setSubmitted to true.
    
  return (
    <Container className="mt-5">
      <h2>Create User</h2>
      <FormModal user={user} submitted={submitted} showModal={showModal} handleCloseModal={handleCloseModal} /> 
      {/* We are inserting the FormModal child component into UserForm and are passing all the props it will need to display when the form is submitted */}
      {submitted && <Alert variant="success" dismissible>{user.name} created successfully!</Alert>}
      {error && <Alert variant="danger" dismissible>{error}</Alert>}

      {/* added "noValidate" and "validated={validated}" as props below inside of the Form component */}
     
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Row>
          <Col md="5"> 
        
            <Form.Group controlId="formName" className="mb-3">
                
              <Form.Label>Name</Form.Label>
              <Form.Control
                    // render various types of form elements, such as text inputs, email fields, passwords, text areas, and more. 
                type="text"
                    // type attribute is used to specify the type of input field
                placeholder="Enter your name"
                    // placeholder attribute is used to display a hint in the input field when it is empty
                name="name"
                    // name="name" - this is used by handleChange to update the correct key in the formData object
                value={formData.name}
                    // value={formData.name} - binds the value of this text field to the name key in the formData object
                onChange={handleChange}
                    // onChange={handleChange} - when the value of this text box changes or is updated the handleChange runs
                required 
                    // required attribute is used to make the input field required
              />

              <Form.Control.Feedback type="invalid">
                Please provide a name
              </Form.Control.Feedback>

            </Form.Group>
          </Col>

        
          <Col md="7">
            <InputGroup className="mb-3" style={{ marginTop: '32px' }}>
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide an email
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col md="7">
            <FloatingLabel controlId="floatingPhone" label="Phone" className="mb-3" style={{ marginTop: '12px' }}>
              <Form.Control
                type="number"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a phone number
              </Form.Control.Feedback>
            </FloatingLabel> 
            {/* FloatingLabel component is used to create a floating label for the input field */}
          </Col>

          <Col md="5">
            <Form.Group controlId="formSelect" className="mb-3">
              <Form.Label>Select Favorite Food</Form.Label>
              <Form.Select
                name="food"
                value={formData.food}
                onChange={handleChange}
                required
              >
                <option hidden value="">Choose...</option> 
                {/* hidden option is used to display a placeholder */}
                <option>Pizza</option>
                <option>Steak</option>
                <option>Ice Cream</option>
                <option>Salad</option>
                <option>Chicken</option>
                <option>Pasta</option>
                <option>Seafood</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Carnivor</option>
                <option>Other</option>
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                Please select a favorite food
              </Form.Control.Feedback>

            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formRadio">
          <Form.Label>Preferred method of communication:</Form.Label>
          <Form.Check
            // Form.Check component is used to create radio buttons
            type="radio"
            id="email"
            name="communication"
            label="Email"
            value="Email"
            onChange={handleChange}
            required
          />
          <Form.Check
        //   Form.Check component is used to create radio buttons
            type="radio"
            id="phone"
            name="communication"
            label="Phone"
            value="Phone"
            onChange={handleChange}
            required
          />
             {validated && !formData.communication && (
          <Form.Control.Feedback type="invalid" className="d-block">
            Please select a communication method
          </Form.Control.Feedback>
    )} 
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
      <OffCanvas />
    </Container>
  );
};

export default UserForm;