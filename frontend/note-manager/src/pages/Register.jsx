import { useState, useContext } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth

  if (auth.IsAuthenticated) return <Nav to='/task' />
  

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      register(username, email, password);
      navigate('/task')
    } catch (error) {
         console.log('error', error);
         
    }
  };

  return (
    <Container>
      <Row className='justify-content-center align-items-center vh-100 container'>
      <Col md={6} >
      <Card className='p-2'  >
      <Card.Title>
      <h2>Register</h2>
      </Card.Title>
      <Card.Body>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter a username"
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="dark" type="submit" className='mt-2'>
          Register
        </Button>
      </Form>
      </Card.Body>
      </Card>
      </Col>
      </Row>
    </Container>
  );
};

export default Register;
