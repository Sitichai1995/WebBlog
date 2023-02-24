const jwt = require('jsonwebtoken');

exports.login = (req,res) => {
    const {username, password} = req.body // กำหนดตัวแปรให้มีค่าเท่ากับที่ส่งมา(req)
    if(password == process.env.PASSWORD){
        //เมื่อเข้าสู่ระบบ จะให้สร้าง token ให้ admin 
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:"1d"})
        return res.json({token,username})
    }else{
        return res.status(400).json({
            error:"password is incorrect"
        })
    }
}