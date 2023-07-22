const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const mapMoneyboxToModels = require('../../utils/MapMoneybox');

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
      throw new Error('Gagal menambahkan ke moneybox');
    }

    return result.rows[0].id;
  }

  async getMoneybox(userId, mbdId) {
    const query = {
      text: 'SELECT * FROM moneybox WHERE user_id = $1 AND mb_details_id = $2',
      values: [userId, mbdId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan moneybox, Id tidak ditemukan');
    }

    return result.rows[0].map(mapMoneyboxToModels);
  }

  async deleteMoneybox(userId, mbdId) {
    const query = {
      text: 'DELETE FROM moneybox WHERE user_id = $1 AND mb_details_id = $2',
      values: [userId, mbdId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menhapus moneybox, Id tidak ditemukan');
    }
  }
}

module.exports = MoneyboxService;
