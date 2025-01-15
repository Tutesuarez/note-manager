import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export const login = (email, password) =>
  API.post('/user/login', { email, password });

export const register = (username, email, password) =>
  API.post('/user/register', {username, email, password });

export const getUserFromTokenAPI = () => {
  return API.get('/user/verify', { withCredentials: true }); 
};

export const logoutsession =()=> API.post('/user/logout', {}, { withCredentials: true });

export const getNotes = () => API.get('/tasks/getalltask');

export const createNote = (data) => API.post('/tasks/create-task', data);

export const updateNote = (id, data) => API.put(`/tasks/updatetask/${id}`, data);

export const deleteNote = (id) => API.delete(`/tasks/deletetaskbyid/${id}`);

