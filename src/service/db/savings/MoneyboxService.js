const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const mapMoneyboxToModels = require('../../utils/MapMoneybox');
const NotFoundError = require('../../../exceptions/client/NotFoundError');
const InvariantError = require('../../../exceptions/client/InvariantError');
const AutorizationsError = require('../../../exceptions/client/AuthorizationError');
const AuthorizationsError = require('../../../exceptions/client/AuthorizationError');

class MoneyboxService {
  constructor() {
    this._pool = new Pool();
  }

  async addMoneybox(userId, mbdId) {
    const id = `mb-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO moneybox VALUES ($1, $2, $3) RETURNING id',
      values: [id, userId, mbdId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menambahkan ke moneybox');
    }

    return result.rows[0].id;
  }

  async deleteMoneybox(userId, mbdId) {
    const query = {
      text: 'DELETE FROM moneybox WHERE user_id = $1 AND mb_details_id = $2',
      values: [userId, mbdId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menhapus moneybox, Id tidak ditemukan');
    }
  }

  async deleteMoneyboxByUserId(userId) {
    const query = {
      text: 'DELETE FROM moneybox WHERE user_id = $1 RETURNING mb_details_id AS "mbdId"',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Gagal menghapus tabungan, User tidak memiliki tabungan.'
      );
    }

    return result.rows;
  }

  async verifyMoneybox(userId, mbdId) {
    const query = {
      text: 'SELECT user_id AS user FROM moneybox WHERE mb_details_id = $1',
      values: [mbdId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Tabungan tidak ditemukan. Id tidak sesuai.');
    }

    const { user } = result.rows[0];

    if (user !== userId) {
      throw new AuthorizationsError(
        'Gagal mendapatkan tabungan, Tabungan bukan milik Anda.'
      );
    }
  }
}

module.exports = MoneyboxService;
