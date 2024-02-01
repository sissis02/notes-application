const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  const { submittedEmail, submittedPassword } = req.body;
  try {
    const user = await tables.user.readByEmailWithPassword(submittedEmail);
    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      submittedPassword
    );

    if (verified) {
      delete user.hashed_password;

      const token = await jwt.sign(
        { userId: user.id },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({ user, token });
    } else {
      res.status(422).send("Email or password incorrect");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
