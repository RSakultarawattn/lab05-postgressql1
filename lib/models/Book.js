const pool = require('../utils/pool');

module.exports = class Book {
    id;
    title;
    description;
    author;
    url;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.description = row.description;
      this.author = row.author;
      this.url = row.url;
    }

    static async insert({ title, description, author, url }) {
      const { rows } = await pool.query(
        'INSERT INTO books (title, description, author, url) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, author, url]
      );

      return new Book(rows[0]);
    }


    static async find() {
      const { rows } = await pool.query('SELECT * FROM books');

      return rows.map(row => new Book(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM books WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No book with id ${id}`);
      return new Book(rows[0]);
    }

    static async update(id, { title, description, author, url }) {
      const { rows } = await pool.query(
        `UPDATE books 
        SET title=$1,
            description=$2,
            author=$3,
            url=$4
        WHERE id=$5
        RETURNING *
      `,
        [title, description, author, url, id]
      );

      return new Book(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM books WHERE id=$1 RETURNING *',
        [id]
      );

      return new Book(rows[0]);
    }
};
