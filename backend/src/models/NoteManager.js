const AbstractManager = require("./AbstractManager");

class NoteManager extends AbstractManager {
  constructor() {
    super({ table: "note" });
  }

  async create({ title, description, userId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, description, user_id) VALUES (?, ?, ?)`,
      [title, description, userId]
    );
    return result;
  }

  async readByUserId(userId) {
    const [rows] = await this.database.query(
      `SELECT  * FROM ${this.table} WHERE user_id=?`,
      [userId]
    );
    return rows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }
}

module.exports = NoteManager;
