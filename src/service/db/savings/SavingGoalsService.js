const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class SavingGoalsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSavingGoal(savingGoal, target) {
    const svgId = `svg-${nanoid(16)}`;
    const status = 'on-going';
    const query = {
      text: 'INSERT INTO saving_goals VALUES ($1, $2, $3, $4) RETURNING id',
      values: [svgId, savingGoal, target, status],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan data saving goal');
    }

    return result.rows[0].id;
  }

  async getSavingGoal(svgId) {
    const query = {
      text: 'SELECT * FROM saving_goals WHERE id = $1',
      values: [svgId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan saving goal, Id tidak ditemukan');
    }
  }

  async deleteSavingGoal(svgId) {
    const query = {
      text: 'DELETE FROM saving_goals WHERE id = $1 RETURNING id',
      values: [svgId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus saving goal, Id tidak ditemukan.');
    }
  }
}

module.exports = SavingGoalsService;
