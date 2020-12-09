const pool = require('..util/pool');

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

}