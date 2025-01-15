import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const NoteForm = ({ note, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: note?.id, title, content });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </Form.Group>
      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        {note ? 'Update Note' : 'Add Note'}
      </Button>
    </Form>
  );
};

export default NoteForm;
