const { static } = require('express');
const pool = require('../utils/pool');

module.exports = class Map {
    id;
    title;
    terrain;
    price;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.terrain = row.terrain;
      this.price = row.price;
    }


    // CRUD MODEL ROUTES/FUNCTIONS
    // Create
    static async insert({ title, terrain, price }) {
        const { rows } = await pool.query(
            'INSERT INTO maps (title, terrain, price) VALUES ($1, $2, $3) RETURNING *',
            [title, terrain, price]
        );

        return new Map(rows[0]);
    }

    // Read
    static async find() {
        const { rows } = await pool.query('SELECT * FROM maps');
        return rows.map(row => new Map(row));
    }



};
