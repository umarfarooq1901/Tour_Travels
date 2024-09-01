const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Field to determine if the user is an admin
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
