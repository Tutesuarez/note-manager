import React, { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../services/api.js';
import NotesList from '../components/NoteList.jsx';
import NoteForm from '../components/NoteForm.jsx';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/useAuth.jsx';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user}= useAuth()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleCreateNote = async (newNote) => {
    try {
      const { data } = await createNote(newNote);
      setNotes((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleUpdateNote = async (noteId, updatedNote) => {
    try {
      const { data } = await updateNote(noteId, updatedNote);
      setNotes((prev) => prev.map((note) => (note._id === noteId ? data : note)));
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };


  return (
    <>
    {loading?(
      <Container>
        <Row  className='justify-content-md-center'>
          <Col >
            <Spinner animation="grow" variant="dark" size='xl'/>
          </Col>
        </Row>
      </Container>  
    ):(      
      <Container>
      <h1>Hi, {user?.username}!</h1>
      <Row>
        <Col xs={12} xl={6}>
      <NoteForm onCreate={handleCreateNote} />
        </Col>
        <Col xs={12} xl={6}>
      <NotesList notes={notes} onDelete={handleDeleteNote} onUpdate={handleUpdateNote} />
        </Col>
      </Row>
    </Container>
    )}
    </>

  );
};

export default NotesPage;
