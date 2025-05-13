const express = require('express');

const { handleImageUpload, addNewProduct, fetchAllProduct, editProduct, deleteProduct } = require('../../controllers/admin/UploadImage-controller')

const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);

router.get('/getall', fetchAllProduct);

router.post('/add', addNewProduct);

router.put('/edit/:id', editProduct);

router.delete('/delete/:id', deleteProduct);



module.exports = router;