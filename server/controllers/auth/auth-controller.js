
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


//register
const registerUser = async (req, res) => {

    const { userName, email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.json({
                success: false,
                message: "Người dùng đã tồn tại",
            })
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword,
        })
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "Đăng ký thành công"
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Đăng ký thất bại"
        })

    }
}


//login
const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message: "Người dùng không tồn tại",
                // email, password

            })
        }

        const checkPassWord = await bcrypt.compare(password, checkUser.password)
        if (!checkPassWord) {
            return res.json({
                success: false,
                message: "Mật khẩu không đúng",
                // email, password
            })
        };
        // tạo token 
        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName


        }, 'CLIENT_SECRET_KEY', { expiresIn: '60m' });


        // gửi token về cookie xong đến phần xử lý của redux 
        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Đăng nhập thành công",
            token,
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName
            },
        });

    } catch (e) {
        console.log("🚀 ~ login ~ e:", e)
        res.status(500).json({
            success: false,
            message: " Đăng nhập thất bại "
        })

    }
}



//logout

const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Đăng xuất thành công"
    });

}

//auth middleware

const authMiddleWare = (req, res, next) => {
    const token = req.cookies.token;    // lấy token ra từ cookie
    if (!token) {
        return res.status(401).json({
            success: false,
            message: " Unauthorised user"
        })
    }
    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');  // nếu có token thì sẽ dùng verify để xác minh token mà giải mã đoạn token bằng 'CLIENT_SECRECT_KEY
        req.user = decoded;
        next();   // dùng để chuyển tới các hàm xử lý chính là ở auth-router
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token hết hạn"
        })
    }
}



module.exports = { registerUser, loginUser, logoutUser, authMiddleWare }