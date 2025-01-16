import { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import { getNotes, createNote, updateNote, deleteNote } from '../services/api';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSave = async (note) => {
    try {
      if (note.id) {
        await updateNote(note);
      } else {
        await createNote(note);
      }
      fetchNotes();
      setCurrentNote();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Container>
      <h2>My Notes</h2>
      <Row>
        <Col md={4}>
          <NoteForm note={currentNote} onSave={handleSave} />
        </Col>
        <Col md={8}>
          <Row>
            {notes.map((note) => (
              <Col md={6} key={note.id}>
                <NoteCard
                  note={note}
                  onEdit={() => setCurrentNote(note)}
                  onDelete={() => handleDelete(note.id)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Notes;
