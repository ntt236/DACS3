const express = require('express');

const { getFilterProduct, getProductById } = require('../../controllers/shop/product-controller')


const router = express.Router();


router.get('/getall', getFilterProduct);
router.get('/getall/:id', getProductById);




module.exports = router;