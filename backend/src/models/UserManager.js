const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create({ firstname, lastname, email, hashedPassword }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, hashed_password) VALUES (?, ?, ?, ?)`,
      [firstname, lastname, email, hashedPassword]
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }

  async readByEmailWithPassword(email) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email=?`,
      [email]
    );
    return result[0];
  }
}

module.exports = UserManager;
