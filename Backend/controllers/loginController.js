import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import "dotenv/config";
import UserModel from '../models/UserModel.js';


export const postLoginController = async (req, res) => { 
    
    const { email, password } = req.body

    try {
        const loggedUser = await UserModel.findOne({email: email});
        if(!loggedUser) {
            return res.status(404).send({success: false, error: 'Invalid username or password combination'});
        }
        const isCorrectPassword = await bcrypt.compare(password, loggedUser.password);
        if(!isCorrectPassword) {
            return res.status(404).send({success: false, error: 'Invalid username or password combination'})
        } 

        const isVerified = loggedUser.verified;
        if(!isVerified) {
            return res.status(404).send({success: false, error: 'Email is not confirmed'})
        }

        const expiresInMs = 500 * 60 * 1000; 
        const expiresInDate = new Date( Date.now() + expiresInMs ); 

        const token = jwt.sign(
            {userId: loggedUser._id},
            process.env.JWT_SECRET,
            {expiresIn: expiresInMs/1000} 
        );

        const cookieOptions = {
            httpOnly: true, 
            maxAge: expiresInMs,
            sameSite: process.env.NODE_ENV === "production" ? "None": "Lax",
            secure: process.env.NODE_ENV === "production"
        }

        res.cookie('jwt', token, cookieOptions);

        const options = {
            maxAge: expiresInMs,
            sameSite: process.env.NODE_ENV === "production" ? "None": "Lax",
            secure: process.env.NODE_ENV === "production"
        };
        const payload = {
            expires: expiresInDate.toISOString(), 
            email: loggedUser.email 
        }
        res.cookie('JWTinfo', payload, options);


        return res.send({success: true, msg: `User ${loggedUser.email} logged in`})
     
        
    } catch (error) {
        console.error(error)
        res.status(500).send({success:false, error: error.message})
    }

}
