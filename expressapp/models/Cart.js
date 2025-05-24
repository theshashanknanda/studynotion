const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Reference to the Course model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model (who added the item to the cart)
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now, // Timestamp for when the item was added to the cart
    },
});

module.exports = mongoose.model("CartItem", cartItemSchema);