const pool = require('../utils/pool');

module.exports = class Guitar {
    id;
    brand;
    description;
    url;

    constructor(row) {
      this.id = row.id;
      this.brand = row.title;
      this.description = row.description;
      this.url = row.url;
    }

    static async insert({ brand, description, url }) {
      const { rows } = await pool.query(
        'INSERT INTO guitars (brand, description, url) VALUES ($1, $2, $3) RETURNING *',
        [brand, description, url]
      );

      return new Guitar(rows[0]);
    }


    static async find() {
      const { rows } = await pool.query('SELECT * FROM guitars');

      return rows.map(row => new Guitar(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM guitars WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No guitar with id ${id}`);
      return new Guitar(rows[0]);
    }

    static async update(id, { brand, description, url }) {
      const { rows } = await pool.query(
        `UPDATE guitars 
        SET brand=$1,
            description=$2,
            url=$3
        WHERE id=$4
        RETURNING *
      `,
        [brand, description, url, id]
      );

      return new Guitar(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM guitars WHERE id=$1 RETURNING *',
        [id]
      );

      return new Guitar(rows[0]);
    }
};
