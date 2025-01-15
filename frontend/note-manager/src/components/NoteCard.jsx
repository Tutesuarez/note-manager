import { Card, Button } from 'react-bootstrap';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.description}</Card.Text>
        <Button variant="info" className="me-2" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
