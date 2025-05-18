const express = require('express');

const { addToCart, fetchCart, deleteCart, updateCart, clearCartByUser } = require('../../controllers/shop/cart-controller')

const router = express.Router();

router.post('/add', addToCart)
router.get('/get/:userId', fetchCart)
router.put('/update-cart', updateCart)
router.delete('/:userId/:productId', deleteCart)
router.delete('/clear-cart/:userId', clearCartByUser);


module.exports = router;
