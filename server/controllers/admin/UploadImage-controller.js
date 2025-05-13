const { imageUploadUtils } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");



const handleImageUpload = async (req, res) => {
    try {
        // chuyển đổi dữ liệu thô khi tải file ảnh lên sang dạng chuỗi base64
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64
        const result = await imageUploadUtils(url);
        res.json({
            success: true,
            result
        })
    } catch (error) {
        console.log("🚀 ~ handleImageUpload ~ error:", error)
        res.json({
            success: false,
            message: "Error uploading image"
        })
    }
}





//add new product

const addNewProduct = async (req, res) => {
    const { title, price, description, category, image, brand, salePrice, totalStock } = req.body
    try {
        const newCreateProduct = new Product({ title, price, description, category, image, brand, salePrice, totalStock });
        await newCreateProduct.save();
        res.status(201).json({
            success: true,
            message: "Thêm sản phẩm thành công",
            data: newCreateProduct
        })


    } catch (error) {
        console.log("🚀 ~ addNewProduct ~ error:", error)
        res.status(500).json({
            success: false,
            message: "Không thể thêm sản phẩm"
        })
    }
}


//fetch product

const fetchAllProduct = async (req, res) => {
    try {
        const listProduct = await Product.find({})
        res.status(200).json({
            success: true,
            message: "Lấy danh sách sản phẩm thành công",
            data: listProduct
        })

    } catch (error) {
        console.log("��� ~ fetchProduct ~ error:", error)
        res.status(500).json({
            success: false,
            message: "Không thể lấy sản phẩm"
        })
    }
}

//update product

//edit product

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { title, price, description, category, image, brand, salePrice, totalStock } = req.body
    try {
        // const findProduct = await Product.findByIdAndUpdate(id, {
        //     title,
        //     price,
        //     description,
        //     category,
        //     image,
        //     brand,
        //     salePrice,
        //     totalStock,

        // }, { new: true, runValidators: true });
        // if (!findProduct) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Không tìm thấy sản phẩm"
        //     })
        // }
        // res.status(200).json({
        //     success: true,
        //     message: "Sửa sản phẩm thành công",
        //     data: findProduct
        // })
        const { id } = req.params;
        const { title, price, description, category, image, brand, salePrice, totalStock } = req.body
        const findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).jsons({
                success: false,
                message: "Sản phẩm không tồn tại"
            })
        }
        findProduct.title = title || findProduct.title;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.image = image || findProduct.image;
        findProduct.brand = brand || findProduct.brand;
        findProduct.salePrice = salePrice == "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        await findProduct.save();
        res.status(200).json({
            success: true,
            message: "Sửa sản phẩm thành công",
            data: findProduct
        })



    } catch (error) {
        console.log("��� ~ editProduct ~ error:", error)
        res.status(500).json({
            success: false,
            message: "Không thể sửa sản phẩm"
        })
    }

}



//delete product

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Sản phẩm không tồn tại"
            })
        }
        res.status(200).json({
            success: true,
            message: "Xóa sản phẩm thành công"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Không thể xóa sản phẩm"
        })
    }
}





module.exports = { handleImageUpload, addNewProduct, deleteProduct, fetchAllProduct, editProduct }