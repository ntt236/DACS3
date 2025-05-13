
const Cart = require("../../models/Cart")
const Product = require("../../models/Product")



const addToCart = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.body


        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Thông tin sản phẩm không hợp lệ"
            })
        }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Sản phẩm không tồn tại "
            })
        }


        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)

        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity })
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }
        await cart.save()
        res.status(200).json({
            success: true,
            message: "Thêm sản phẩm vào giỏ hàng thành công",
            data: cart
        })

    } catch (error) {
        console.log("🚀 ~ addCart ~ error:", error)
        res.status(500).json({
            success: false,
            message: "không thể thêm sản phẩm"
        })

    }
}


// fetch product cart 

const fetchCart = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Thông tin người dùng không hợp lệ"
            })
        }
        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice"
        })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Giỏ hàng của người dùng không tồn tại"
            })
        }

        const validItems = cart.items.filter(productItem => productItem.productId);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save()
        }

        const populateCartItems = validItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity
        }))

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })


    } catch (error) {
        console.log("🚀 ~ addCart ~ error:", error)
        res.status(500).json({
            success: false,
            message: "không thể thêm sản phẩm"
        })

    }
}

//update product cart

const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body


        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Thông tin sản phẩm không hợp lệ"
            })
        }

        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Giỏ hàng của người dùng không tồn tại"
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Sản phẩm không tồn tại trong gi�� hàng của bạn"
            })
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice"
        })
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.productId ? item.quantity : null
        }))

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    } catch (error) {
        console.log("🚀 ~ addCart ~ error:", error)
        res.status(500).json({
            success: false,
            message: "không thể thêm sản phẩm"
        })

    }
}


// delete product cart

const deleteCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(404).json({
                success: false,
                message: "Thông tin sản phẩm không hợp lệ"
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice"
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Giỏ hàng của người dùng không tồn tại"
            });
        }

        // Lọc sản phẩm muốn xóa
        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);

        // Nếu không còn sản phẩm nào trong giỏ hàng, xóa giỏ hàng
        if (cart.items.length === 0) {
            await Cart.deleteOne({ userId });
            return res.status(200).json({
                success: true,
                message: "Giỏ hàng của bạn đã trống và đã bị xóa."
            });
        }

        // Lưu giỏ hàng sau khi xóa sản phẩm
        await cart.save();
        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice"
        });

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        });
    } catch (error) {
        console.log("🚀 ~ deleteCart ~ error:", error);
        res.status(500).json({
            success: false,
            message: "Không thể xóa sản phẩm khỏi giỏ hàng."
        });
    }
};

module.exports = { addToCart, fetchCart, deleteCart, updateCart }