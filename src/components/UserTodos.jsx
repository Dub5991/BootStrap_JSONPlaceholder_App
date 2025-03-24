// src/components/UserTodos.js

import { useState, useEffect } from 'react';       // Import useState and useEffect hooks
import { useParams } from 'react-router-dom';      // Import useParams hook to access URL parameters
import axios from 'axios';                         // Import axios for API calls
import Container from 'react-bootstrap/Container'; // Import Container component from react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup'; // Import ListGroup component from react-bootstrap
import Spinner from 'react-bootstrap/Spinner';     // Import Spinner component from react-bootstrap

function UserTodos() {
  const { userId } = useParams();          
  const [todos, setTodos] = useState([]);  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user and todos for the specific userId
  // useEffect hook is used to fetch data when the component mounts and when userId changes. it is similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    const fetchUserAndTodos = async () => {
      try {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUser(userResponse.data);

        const todosResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        setTodos(todosResponse.data);

      } catch (error) {
        setError(`Failed to fetch: ${error.message}`);

      } finally {
        setLoading(false); // Set loading to false after fetching data, because loading is complete
      }
    };

    if (userId) {
      fetchUserAndTodos();
    }
  }, [userId]); // Refetch todos if userId changes

  if (loading) {
    return (
      <Container>
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: '15px' }}
            role="status"
          />
          Loading User Todos...
        </h3>
      </Container>
    )
  }
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <h4>Todos for: {user.name}</h4>
      <ListGroup className="mt-4" as="ol" numbered>
        {todos.map(todo => (
          <ListGroup.Item key={todo.id} variant={todo.completed ? "info" : "warning"}>
            {todo.completed ? "✅" : "❌"} - {todo.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default UserTodos;