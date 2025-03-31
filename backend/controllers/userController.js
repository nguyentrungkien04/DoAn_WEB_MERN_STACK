import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"


//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message:"Người dùng không tồn tại"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message:"Mật khẩu không chính xác"});
        }
        const token = createToken(user._id)
        res.json({success: true, token});
    } catch (error) {
        console.log(error)
        res.json({success: false, message:"Lỗi khi đăng nhập"});
    }
}

//generate token

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

//logout user

//register user
const registerUser = async (req, res) => {
    //kiem tra nguoi dung co ton tai khong
    const {name, password, email} = req.body;
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message:"Người dùng đã tồn tại"});
        }
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"Hãy nhập email hợp lệ"});
        }
        if(password.length<8){
            return res.json({superuser: false, message:"Hãy nhập mật khẩu mạnh hơn"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword,
            role: 'user'
        });
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token});

    } catch(error){
        console.log(error)
        res.json({success: false, message:"Error"})
    }
}

export { loginUser, registerUser}