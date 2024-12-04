const mongoose = require("mongoose");
const Favourite = require("./Favourite");

const homeSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photoUrl: String,
  description: String,
});

homeSchema.pre("findByIdAndDelete", async function (next) {
  const homeId = this.getQuery()["_id"];
  await Favourite.deleteOne({ homeId });
  next();
});

module.exports = mongoose.model("Home", homeSchema);
