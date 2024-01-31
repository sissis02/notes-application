const tables = require("../tables");

const add = async (req, res, next) => {
  const note = req.body;
  try {
    const insertId = await tables.note.create(note);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const readByUserId = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const notes = await tables.note.readByUserId(userId);
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.note.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
  readByUserId,
  destroy,
};
