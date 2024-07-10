const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: 'http://localhost',
}

app.use(cors(corsOptions));
app.use(express.json());

const notesController = require("./controllers/notesController");

app.get("/api/notes", notesController.getNotes);
app.get("/api/notes/:noteId", notesController.getNote);
app.post("/api/notes", notesController.createNote);
app.put("/api/notes/:noteId", notesController.updateNote);
app.delete("/api/notes/:noteId", notesController.deleteNote);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
