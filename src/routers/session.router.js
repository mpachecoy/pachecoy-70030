import { Router } from "express";
import passport from "passport";
import { generaJWT, passportCall } from "../utils/passport.utils.js";

export const router = Router();

router.post('/register', passportCall("register"), (req,res) => {
    
    res.setHeader('Content-Type','application/json');
    res.status(201).json({ 
        message:"Registro exitoso", 
        usuarioRegistrado: req.user 
    });
});

router.post("/login", passportCall("login"), (req, res) => {

    let token = generaJWT(req.user);
    res.cookie("CoderCookie", token);

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({ 
        message: "Login exitoso", 
        usuarioLogueado: req.user
    });
});