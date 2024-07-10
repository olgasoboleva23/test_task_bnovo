import axios from 'axios'

export const NotesAPI = axios.create({
  baseURL: 'http://localhost:3000/api/notes',
});
