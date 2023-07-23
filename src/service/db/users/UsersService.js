const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

class UsersService {
  constructor(savingsService) {
    this._pool = new Pool();
    this._savingsService = savingsService;
  }

  async addUser({ username, firstName, lastName, password, email, address }) {
    const id = `user-${nanoid(16)}`;
    const _username = `${+new Date()}-${username}`;
    const hashedPassword = await bcrypt.hash(password);

    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [
        id,
        _username,
        firstName,
        lastName,
        hashedPassword,
        email,
        address,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan data user.');
    }

    return result.rows[0].id;
  }

  async deleteUser(userId) {
    const query = {
      text: 'DELETE FROM users WHERE id = $1 RETURNING id',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus user, Id tidak ditemukan.');
    }
  }
}

module.exports = UsersService;
