const AbstractManager = require("./AbstractManager");

class NoteManager extends AbstractManager {
  constructor() {
    super({ table: "note" });
  }

  async create({ title, description, category, userId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, description, category, user_id) VALUES (?, ?, ?, ?)`,
      [title, description, category, userId]
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

  async update(id, title, description) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title=?, description=? WHERE id=?`,
      [title, description, id]
    );
    return result[0];
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
