const pool = require('../utils/pool');

module.exports = class Song {
    id;
    title;
    description;
    url;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.description = row.description;
      this.url = row.url;
    }

    static async insert({ title, description, url }) {
      const { rows } = await pool.query(
        'INSERT INTO songs (title, description, url) VALUES ($1, $2, $3) RETURNING *',
        [title, description, url]
      );

      return new Song(rows[0]);
    }


    static async find() {
      const { rows } = await pool.query('SELECT * FROM songs');

      return rows.map(row => new Song(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM songs WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No song with id ${id}`);
      return new Song(rows[0]);
    }

    static async update(id, { title, description, url }) {
      const { rows } = await pool.query(
        `UPDATE songs 
        SET title=$1,
            description=$2,
            url=$3
        WHERE id=$4
        RETURNING *
      `,
        [title, description, url, id]
      );

      return new Song(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM songs WHERE id=$1 RETURNING *',
        [id]
      );

      return new Song(rows[0]);
    }
};
