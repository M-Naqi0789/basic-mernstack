import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const signup = (userData) => api.post('/auth/signup', userData);
export const login = (userData) => api.post('/auth/login', userData);

export const getNotes = () => api.get('/notes');
export const createNote = (noteData) => api.post('/notes', noteData);
export const updateNote = (id, noteData) => api.patch(`/notes/${id}`, noteData);
export const deleteNote = (id) => api.delete(`/notes/${id}`);