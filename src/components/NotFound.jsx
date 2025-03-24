import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10); // 10 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // the idea of this is to decrement the countdown every second

    const timeout = setTimeout(() => {
      navigate('/'); // redirect to the home page after 10 seconds
    }, 10000); // the idea is to redirect to the home page after 10 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]); // When we put navigate in the dependencies array, it's like telling the computer, "Hey, keep an eye on this thing called navigate. If it changes, do something about it." This stops the computer from complaining that we forgot to watch it.

  return (
    <Container>
      <h2>404 Not Found</h2>
      <p>I am sorry, that location does not exist 😭</p>
      <p><b>You will be redirected to the home page in...</b></p>
      <Badge bg="primary" className="mb-3 fs-2">{countdown}</Badge>
      <p>Or you can always <Link to="/">go home!</Link></p>
    </Container>
  );
}

export default NotFound;