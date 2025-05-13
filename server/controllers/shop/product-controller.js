
const Product = require('../../models/Product')


const getFilterProduct = async (req, res) => {

    try {
        const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

        let filters = {};

        if (category.length) {
            filters.category = { $in: category.split(",") };
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(",") };
        }

        let sort = {};

        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1;

                break;
            case "price-hightolow":
                sort.price = -1;

                break;
            case "title-atoz":
                sort.title = 1;

                break;

            case "title-ztoa":
                sort.title = -1;

                break;

            default:
                sort.price = 1;
                break;
        }
        const products = await Product.find(filters).sort(sort);
        res.status(200).json({
            success: true,
            message: "Lấy danh sách sản phẩm thành công",
            data: products
        })

    } catch (error) {
        console.log("🚀 ~ getFilterProduct ~ error:", error)
        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách sản phẩm theo yêu cầu"
        })

    }
}


const getProductById = async (req, res) => {

    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Sản phẩm không tồn tại"
            })
        }

        res.status(200).json({
            success: true,
            message: "Lấy sản phẩm thành công",
            data: product
        })

    } catch (error) {
        console.log("🚀 ~ getProductById ~ error:", error)
        res.status(500).json({
            success: false,
            message: "Không thể lấy sản phẩm theo ID"

        })

    }
}
module.exports = { getFilterProduct, getProductById }