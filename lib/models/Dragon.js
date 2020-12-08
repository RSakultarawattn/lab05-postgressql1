const pool = require('../utils/pool');

module.exports = class Dragon {
    id;
    breed;
    description;
    url;

    constructor(row) {
      this.id = row.id;
      this.breed = row.title;
      this.description = row.description;
      this.url = row.url;
    }

    static async insert({ type, description, url }) {
      const { rows } = await pool.query(
        'INSERT INTO dragons (breed, description, url) VALUES ($1, $2, $3) RETURNING *',
        [type, description, url]
      );

      return new Dragon(rows[0]);
    }


    static async find() {
      const { rows } = await pool.query('SELECT * FROM dragon');

      return rows.map(row => new Dragon(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM dragons WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No dragon with id ${id}`);
      return new Dragon(rows[0]);
    }

    static async update(id, { breed, description, url }) {
      const { rows } = await pool.query(
        `UPDATE dragons 
        SET breed=$1,
            description=$2,
            url=$3
        WHERE id=$4
        RETURNING *
      `,
        [breed, description, url, id]
      );

      return new Dragon(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM dragons WHERE id=$1 RETURNING *',
        [id]
      );

      return new Dragon(rows[0]);
    }
};
