import { useState, useContext} from 'react';
import { Form, Button, Container, Nav, Card, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const auth = useAuth()

  if (auth.IsAuthenticated) return <Nav to='/task' />
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login(email, password);
      
        navigate('/task')
    } catch (error) {
      console.log(' errorrrr al inciar sesion',error);     
    }
  };

  return (
    <Container>
      <Row className='justify-content-center align-items-center vh-100 container'>
        <Col md={6} >
        
      <Card className='p-2'  >
        <Card.Title>
          <h2>Login</h2>
        </Card.Title>
        <Card.Body>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className='mb-2'
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
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
        </Col>

     
      </Row>
    </Container>
  );
};

export default Login;

