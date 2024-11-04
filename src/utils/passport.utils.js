import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import env from "./env.utils.js"

export const generaHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validaPassword = (pass, hash) => bcrypt.compareSync(pass, hash);

export const generaJWT = usuario => jwt.sign( usuario, env.SECRET, { expiresIn:1800 });
export const validaJWT = token => jwt.verify( token, env.SECRET );   

export const passportCall = estrategy => (req, res, next) => {
    passport.authenticate(estrategy, (error, user, info) => {
        if(error) { return next(error) };

        if(!user){  
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({ error:`${info.message?info.message:info.toString() }`});
        };

        req.user = user;
        next();

    })(req, res, next);
};