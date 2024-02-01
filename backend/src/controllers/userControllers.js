const tables = require("../tables");

const add = async (req, res, next) => {
  const user = req.body;
  try {
    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.user.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const readByToken = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.auth.userId);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user[0]);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
  destroy,
  readByToken,
};
