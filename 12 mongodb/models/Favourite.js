const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database-util");

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("favourites").find().toArray();
  }

  save() {
    const db = getDb();
    return db
      .collection("favourites")
      .findOne({ homeId: this.homeId })
      .then((existingFav) => {
        if (!existingFav) {
          return db.collection("favourites").insertOne(this);
        }
        return Promise.resolve();
      });
  }

  static deleteById(homeId) {
    const db = getDb();
    return db.collection("favourites").deleteOne({ homeId: homeId });
  }
};
