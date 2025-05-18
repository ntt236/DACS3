const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            cartId,
        } = req.body;

        if (paymentMethod !== "cod") {
            return res.status(400).json({
                success: false,
                message: "Only COD payment is supported.",
            });
        }

        const newOrder = new Order({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus: "pending",
            paymentMethod: "cod",
            paymentStatus: "pending",
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId: null,
            payerId: null,
        });

        await newOrder.save();

        // Xóa giỏ hàng sau khi tạo đơn
        await Cart.findByIdAndDelete(cartId);

        res.status(201).json({
            success: true,
            orderId: newOrder._id,
            message: "Order created successfully with COD payment",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};

const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });
        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }
        res.status(200).json({ success: true, data: orders });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Some error occurred!" });
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, data: order });
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Some error occurred!" });
    }
};

module.exports = {
    createOrder,
    getAllOrdersByUser,
    getOrderDetails,
};
