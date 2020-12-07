const pool = require('../utils/pool');

module.exports = class Guitar {
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
            'INSERT INTO guitars (title, description, url) VALUES ($1, $2, $3) RETURNING *',
            [title, description, url]
        );

        return new Guitar(rows[0]);
    }
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
    if (!rows[0]) throw new Error(`No guitar with id ${id}`);
    return new Guitar(rows[0]);
}

static async update(id, { title, description, url }) {
    const { rows } = await pool.query(
        `UPDATE guitars 
        SET title=$1,
            description=$2,
            url=$3
        WHERE id=$4
        RETURNING *
      `,
        [title, description, url, id]
    );

    return new Guitar(rows[0]);
}

  static async delete (id) {
    const { rows } = await pool.query(
        'DELETE FROM guitars WHERE id=$1 RETURNING *',
        [id]
    );

    return new Guitar(rows[0]);
}
};