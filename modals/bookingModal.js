const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tour: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
    bookingDate: { type: Date, default: Date.now },
    numberOfPeople: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
