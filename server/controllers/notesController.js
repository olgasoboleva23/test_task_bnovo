const { Note, Task } = require("../database");

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.findAll({order: [['createdAt', 'DESC']]});

    res.status(200).json({ status: true, data: notes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

const createNote = async (req, res, next) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      color: req.body.color,
    });

    res.status(200).json({ status: true, data: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

const getNote = async (req, res, next) => {
  try {
    const note = await Note.findByPk(req.params.noteId);

    res.status(200).json({ status: true, data: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByPk(req.params.noteId);

    await note.update({
      title: req.body.title,
      tasks: req.body.tasks,
    });

    res.status(200).json({ status: true, data: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByPk(req.params.noteId);

    await note.destroy();

    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

module.exports = { getNotes, createNote, getNote, updateNote, deleteNote };
