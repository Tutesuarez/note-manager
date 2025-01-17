import { React, useState } from 'react';
import { Card, Button, Container, Form } from 'react-bootstrap';

const NoteItem = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: note.title, description: note.description });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(note._id, formData);
    setIsEditing(false); // Cierra el modo de edición
  };

  return (
    <Container>
      <Card className="mb-3">
        <Card.Body>
          {isEditing ? (
            <Form onSubmit={handleUpdate}>
              <Form.Group>
                <Form.Control type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="mb-2" />
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Form.Group>
              <Button type="submit" variant="info" className="mx-1"> Save </Button>
              <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </Form>
          ) : (
            <>
              <Card.Title>{note.title}</Card.Title>
              <Card.Text>{note.description}</Card.Text>
              <Button onClick={() => onDelete(note._id)} className="mx-1" variant="danger">Delete</Button>
              <Button onClick={() => setIsEditing(true)} className="mx-1" variant="info">Update</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NoteItem;