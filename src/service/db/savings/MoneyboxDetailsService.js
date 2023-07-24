const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const mapMoneyboxDetailsToModels = require('../../utils/MapMoneyboxDetails');
const NotFoundError = require('../../../exceptions/client/NotFoundError');
const InvariantError = require('../../../exceptions/client/InvariantError');

class MoneyboxDetailsService {
  constructor() {
    this._pool = new Pool();
  }

  async addMoneyboxDetail(balance, svgId) {
    const id = `mbd-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO moneybox_details VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, balance, svgId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan moneybox details.');
    }

    return result.rows[0].id;
  }

  async getMoneyboxDetailsById(mbdId) {
    const query = {
      text: 'SELECT * FROM moneybox_details WHERE id = $1',
      values: [mbdId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal mendapatkan detail moneybox');
    }

    return result.rows[0].map(mapMoneyboxDetailsToModels);
  }

  async putMoneyboxDetails(mbdId, { amount }) {
    const updatedAt = new Date().toISOString();
    const { balance } = await this.getMoneyboxDetailsById(mbdId);
    const query = {
      text: 'UPDATE moneybox_details SET balance = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [balance + amount, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui tabungan, Id tidak ditemukan');
    }
  }

  async deleteMoneyboxDetails(mbdId) {
    const query = {
      text: 'DELETE FROM moneybox_details WHERE id = $1 RETURNING id',
      values: [mbdId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Gagal menhapus moneybox details, Id tidak ditemukan'
      );
    }
  }
}

module.exports = MoneyboxDetailsService;
