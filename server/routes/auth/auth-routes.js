
const express = require('express');

const { registerUser, loginUser, logoutUser, authMiddleWare } = require('../../controllers/auth/auth-controller')

const router = express.Router();

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/logout', logoutUser)

router.get('/check-auth', authMiddleWare, (req, res) => {
    // khi bên phía client thực hiện 1 yêu cầu get '/check-auth' đến server thì server sẽ thực thi hàm authMiddleware  
    // sau đó kiểm tra token trong cookie có thì sẽ gán thông tin user vào req.user 
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Người dùng được xác nhận",
        user
    })
})


module.exports = router;