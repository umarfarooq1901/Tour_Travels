const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String }, // URL to an image representing the tour
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
