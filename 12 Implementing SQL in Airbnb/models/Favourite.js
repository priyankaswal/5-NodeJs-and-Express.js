const airbnbDb = require("../util/database-util");

module.exports = class Favourite {
  static fetchAll() {
    return airbnbDb.execute(`SELECT * FROM favourites`);
  }

  static addToFavourites(homeId) {
    return airbnbDb.execute(`INSERT INTO favourites (favIds) VALUES(?)`, [
      homeId,
    ]);
  }

  static deleteById(homeId) {
    return airbnbDb.execute(`DELETE FROM favourites where favIds=?`, [homeId]);
  }
};
