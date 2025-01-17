import { Container, Row, Col} from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row  className='justify-content-center align-items-center container-fluid mt-5'>
        <Col md={6}>
          <h1>Welcome to Note Manager</h1>
          <p>Manage your notes securely and efficiently.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
