const Favourite = require("./Favourite");
const airbnbDb = require("../util/database-util");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
  }

  save() {
    // return airbnbDb.execute(`INSERT INTO homes (houseName, price, location, rating, photoUrl , description) VALUES('${this.houseName}' , ${this.price}, '${this.location}', ${this.rating}, '${this.photoUrl}', '${this.description}')`);

    if (this.id) {
      // return airbnbDb.execute(
      //   `UPDATE homes SET houseName = '${this.houseName}',price = ${this.price},
      //   location = '${this.location}', rating = ${this.rating}, photoUrl = '${this.photoUrl}', description = '${this.description}' WHERE id= ${this.id}`,
      // );

      return airbnbDb.execute(
        "UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=? , description=? WHERE id=?",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ]
      );
    } else {
      return airbnbDb.execute(
        `INSERT INTO homes (houseName, price, location, rating, photoUrl , description) VALUES(? , ? , ? , ? , ? , ? )`,
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
        ]
      );
    }
  }

  static fetchAll() {
    return airbnbDb.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return airbnbDb.execute("SELECT * FROM homes WHERE id=?", [homeId]);
  }

  static deleteById(homeId) {
    return Promise.all([
      airbnbDb.execute(`DELETE FROM favourites WHERE favIds=?`, [homeId]),
      airbnbDb.execute(`DELETE FROM homes WHERE id=?`, [homeId]),
    ]);
  }
};
