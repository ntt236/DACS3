const express = require('express')
const mongoose = require('mongoose')
const cookieParse = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/product-route')
const adminOrderRouter = require('./routes/admin/order-routes')

const shopProductRouter = require('./routes/shop/product-route')
const shopCartRouter = require('./routes/shop/cart-route')
const shopAddressRouter = require('./routes/shop/addres-routes')
const shopOrderRouter = require('./routes/shop/order-routes')
// create a database connection => u can alse
// create a separate file fore this and then import/use that file here 
require('dotenv').config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));


const app = express()
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: ['http://localhost:5173', 'http://10.0.2.2:5000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
);


app.use(cookieParse());
app.use(express.json());

//router của admin
app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductRouter)
app.use("/api/admin/orders", adminOrderRouter);


//router của shop (customer)
app.use("/api/shop/products", shopProductRouter)
app.use("/api/shop/cart", shopCartRouter)
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`))
