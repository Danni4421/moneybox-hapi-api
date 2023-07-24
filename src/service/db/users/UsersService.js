const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

const InvariantError = require('../../../exceptions/client/InvariantError');
const AuthenticationsError = require('../../../exceptions/client/AuthenticationsError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');

class UsersService {
  constructor(savingsService) {
    this._pool = new Pool();
    this._savingsService = savingsService;
  }

  async addUser({ username, firstName, lastName, password, email, address }) {
    const id = `user-${nanoid(16)}`;
    const _username = `${+new Date()}-${username}`;
    console.log(_username);
    const hashedPassword = await bcrypt.hash(password, 10);

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
      throw new InvariantError('Gagal menambahkan data user.');
    }

    return result.rows[0].id;
  }

  async getUser(userId) {
    const query = {
      text: 'SELECT username, "firstName", "lastName", email FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan User, Id tidak ditemukan.');
    }

    const { username, firstName, lastName, email } = result.rows[0];
    const fullName = `${firstName} ${lastName}`;

    const _user = {
      username,
      fullName,
      email,
    };

    return _user;
  }

  async deleteUser(userId) {
    const query = {
      text: 'DELETE FROM users WHERE id = $1 RETURNING id',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus user, Id tidak ditemukan.');
    }
  }

  async verifyUserCredentials({ username, password }) {
    console.log(username, password);
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);
    console.log(result);
    if (!result.rowCount) {
      throw new AuthenticationsError(
        'Verifikasi gagal, Kredensial tidak valid.'
      );
    }

    const { id, password: hashedPassword } = result.rows[0];

    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      throw new AuthenticationsError(
        'Verifikasi gagal, Kredensial tidak valid.'
      );
    }

    return id;
  }
}

module.exports = UsersService;
