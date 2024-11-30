const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Create Order
exports.createOrder = async (req, res) => {
    const { products, shippingInfo } = req.body;
    try {
        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product?.name}` });
            }
            product.stock -= item.quantity;
            totalAmount += product.price * item.quantity;
            await product.save();
        }
        const order = new Order({ customerId: req.user.id, products, shippingInfo, totalAmount });
        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
