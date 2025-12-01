import statusCode from '../config/statusCode.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const authMiddleware = async(req,res,next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(statusCode.NOT_FOUND).json({
                message:"token missing"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded;
        next();

    }catch(error){
        console.log("error",error.message)
    }
}


