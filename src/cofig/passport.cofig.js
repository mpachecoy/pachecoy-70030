import passport from "passport";
import passportJWT from "passport-jwt";
import local from "passport-local";
import { userService } from "../services/user.service.js";
import { generaHash, validaPassword } from "../utils/passport.utils.js";
import env from "../utils/env.utils.js"

const getToken = (req) =>{
    let token = null;

    if(req.cookies.CoderCookie){
        token = req.cookies.CoderCookie;
    };

    return token;
};

export const iniciaPassport = () => {

    passport.use(
        "register",
        new local.Strategy(
            {
                passReqToCallback: true, 
                usernameField: "email"
            },
            async( req, username, password, done ) => {
                try {
                    let { first_name, last_name, ...data } = req.body;
                    if(!first_name){
                        console.log("falta nombre");
                        return done(null, false, {message:"Nombre es requerido"});
                    };
                    if(!last_name){
                        console.log("falta apellido");
                        return done(null, false, {message:"Apellido es requerido"});
                    };

                    let existe = await userService.getUserByEmail(username);
                    if(existe){
                        console.log("usuario repetido");
                        return done(null, false, {message:"email existe en db"});
                    };

                    let newUser = await userService.create({
                        first_name,
                        last_name,
                        ...data,
                        email: username,
                        password: generaHash( password )
                    });

                    return done( null, newUser );
                } catch (error) {
                    console.log(error.message)
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async( username, password, done ) => { 
                try {
                    let user = await userService.getUserByEmail(username);
                    console.log(user)
                    
                    if(!user || !user.password){
                        return done( null, false, {message:"Credenciales invalidas"} );
                    };

                    if(!validaPassword( password, user.password )){
                        return done( null, false, {message:"Credenciales invalidas"} );
                    };

                    delete user.password;
                    return done( null, user );
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "current",
        new passportJWT.Strategy(
            {
                secretOrKey: env.SECRET,
                jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([getToken])
            },
            async (usuario, done) => {
                try {
                    return done(null, usuario);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};