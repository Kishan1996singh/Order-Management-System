const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "shipped", "cancelled"], default: 'pending' },
    shippingInfo: {
        address: String,
        city: String,
        postalCode: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
