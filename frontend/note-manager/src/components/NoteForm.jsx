import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const NoteForm = ({ onCreate }) => {
  const [note, setNote] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(note);
    setNote({ title: '', description: '' }); // Limpiar formulario
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleChange}
          className='my-2'
        />
        <Form.Control as="textarea" row={6}
          name="description"
          placeholder="Description"
          value={note.description}
          onChange={handleChange}
          className='mb-2'
        ></Form.Control>
      </Form.Group>
      <Button type="submit" variant="dark">Add Note</Button>
    </Form>
  );
};

export default NoteForm;