const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken");
const VerificationCode = require("../models/VerificationCode");
const nodemailer = require("nodemailer");
const { generateEmailHTML_FORVCODE, generateEmailHTML_FORRLINK } = require("../functions/email");
const Token = require("../models/Token");
require("dotenv").config()

let invalidTokens = new Set();

const signIn = async (request,response) => {
    try{
        const {email,password} = request.body;
        const user = await User.findOne({email});

        if(!user){
            return response.status(401).json({
                'message' : 'Email or password incorrect'
            })
        }

        const passwordMatches = await bcrypt.compare(password,user.password);
        if(!passwordMatches){
            return response.status(401).json({
                'message' : 'Email or password incorrect'
            })
        }

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            { expiresIn: "200h" }
        );

        const userData = user.toObject();
        delete userData.password;

        return response.json({
            'userData' : userData,
            'token' : token
        });

    }catch(error){
        return response.status(500).json({
            'messahe' : error.message
        })
    }
}

const signUp = async (request,response) =>{
    try{
        const {name,email,password,vcode} = request.body;
        const isCredentialsValid = await VerificationCode.findOne({
            email,
            code:vcode,
            expires_at: { $gt: new Date() }
        })

        if(!isCredentialsValid){
            return response.status(401).json({
                'message' : 'Verification code incorrect or expired'
            })
        }
        const hashedPass = await bcrypt.hash(password,10);

        const user = new User({
            name,
            email,
            password:hashedPass
        });
        await user.save();
        const userData = user.toObject()
        delete userData.password;

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            { expiresIn: "200h" }
        );

        return response.json({
            'message' : 'Registred successfully!',
            'userData' : userData,
            'token' : token
        })

    }catch(error){
        return response.status(500).json({
            'message' : error.message
        })
    }
}

const sendVCode = async (request,response) =>{
    try{
        const {name,email} = request.body;
        const alreadyExists = await User.findOne({email});

        if(alreadyExists){
            return response.status(401).json({
                'message' : 'A user with this email already exists'
            })
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.SMTP_MAIL, 
              pass: process.env.SMTP_PASS
            }
        });
          
        const mailOptions = {
            from: process.env.FROM_MAIL,  
            to: email,  
            subject: 'Verification code', 
            html: generateEmailHTML_FORVCODE(name,"OpportuNet",verificationCode)
        };
        
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return response.status(400).json({
                    'message' : 'An error occured'
                })
            } else {
                const vCode = new VerificationCode({
                    email,
                    code:verificationCode,
                });
                await vCode.save();
                return response.json({
                    'message' : "A verification code sent to your email"
                })
            }
        });


    }catch(error){
        return response.status(500).json({
            'message' : error.message
        })
    }
}


const sendResetLink = async (request,response) =>{
    try{
        const {email} = request.body;
        const userExists = await User.findOne({email});

        if(!userExists){
            return response.status(401).json({
                'message' : "User with this email doesn't exist in our app"
            })
        }

        let token = '';
        const chars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm123456789';
        for(let i=0; i < 30; i++){
            const randomIndex = Math.floor(Math.random() * chars.length);
            token += chars[randomIndex];
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.SMTP_MAIL, 
              pass: process.env.SMTP_PASS
            }
        });
          
        const mailOptions = {
            from: process.env.FROM_MAIL,  
            to: email,  
            subject: 'Reset link', 
            html: generateEmailHTML_FORRLINK(token,'OppotuNet',email,process.env.RESET_LINK_URL)
        };
        

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return response.status(400).json({
                    'message' : 'An error occured'
                })
            } else {
                const vCode = new Token({
                    email,
                    token,
                });
                await vCode.save();
                return response.json({
                    'message' : "Reset link sent to your email"
                })
            }
        });
    }catch(error){
        return response.status(500).json({
            'message' : error.message
        })
    }
}

const resetPassword = async (request,response) =>{
    try{
        const {email,token,password} = request.body;
        const isCredentialsValid = await Token.findOne({
            email,
            token,
            expires_at: { $gt: new Date() }
        });

        if(!isCredentialsValid){
            return response.status(401).json({
                'message' : 'The reset token was expired'
            })
        }

        const hashedPass = await bcrypt.hash(password,10);
        const user = await User.findOne({email});
        user.password = hashedPass;

        await user.save();

        return response.json({
            'message' : 'Your password has been resetd!'
        });
    }catch(error){
        return response.status(500).json({
            'message' : error.message
        })
    }
}


const logout = (request,response) =>{
    try{
        const token = request.headers['authorization'].split(' ')[1];
        if(!token){
            return response.status(401).json({
                'message' : 'No token provided'
            })
        }
        invalidTokens.add(token);
        return response.json({
            'message' : 'Logged out suucessfully!'
        });
    }catch(error){
        return response.status(500).json({
            'message' : error.message
        })
    }
}

module.exports = { signIn, signUp, sendVCode, sendResetLink, resetPassword, logout }