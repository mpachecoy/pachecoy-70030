import { faker } from "@faker-js/faker";
import CustomError from "../utils/errors/CustomError.utils.js";
import winstonLogger  from "../utils/winston.utils.js";
import { userService } from "../services/user.service.js";
import errors from "../utils/errors/errors.js";

export default class UserController{
    static async create(req, res, next){
        try {
            const { first_name, last_name, email, password } = req.body;        
            if (!first_name || !last_name || !email || !password) {
                CustomError.newError(errors.error);
            };
            const body = req.body;
            const one = await userService.create(body);
    
            res.status(201).json({ status: "ok", one });
    
        } catch (error) {
            return next(error);
        };
    };

    static async getUsers(req, res, next){
        try {
            const response = await userService.getUsers();
            winstonLogger.info(response);
            if (response.length > 0) {
                return res.status(200).json({ message: "USERS READ", response });
            } else {
                CustomError.newError(errors.notFound)
            }
        } catch (error) {
            return next(error)
        }
    };

    static async getBy(req, res, next){
        try {
            let { uid } = req.params;
            let user = await userService.getById(uid);
            if(!user) return res.status(404).json({ status: "error", msg:"Usuario no encontrado"});
        
            res.status(200).json({status:"ok", user});
        } catch (error) {
            return next(error)
        };
    };    

    static async createMock (req, res, next){
        try {
            const first_name = faker.person.firstName().toLocaleLowerCase();
            const last_name = faker.person.lastName().toLocaleLowerCase();
            const data = {
                first_name,
                last_name,
                email: first_name + last_name +"@coder.com",
                password: "1234",
                age: 18,
                role: "user",
                avatar: faker.image.avatar()
            };
            const one = await userService.create(data);
            return res.status(201).json({
                response: one,
                message: "User created Mock"
            }); 
        } catch (error) {
            return next(error);
        }
    };

    static async createMocks (req, res, next){
        try {
            const { quantity } = req.params;

            for (let i = 0; i <= quantity; i++){
                const first_name = faker.person.firstName().toLocaleLowerCase();
                const last_name = faker.person.lastName().toLocaleLowerCase();
                const data = {
                    first_name,
                    last_name,
                    email: first_name + last_name +"@coder.com",
                    password: "1234",
                    age: 18,
                    role: "user",
                    avatar: faker.image.avatar()
                };
                const one = await userService.create(data);
            };
            return res.status(201).json({
                message:  quantity + " Users created Mock"
            });
        } catch (error) {
            return next(error);
        }
    };

    static async delete (req, res, next){
        try {
            const { uid } = req.params;
            const user = await userService.delete(uid);
            if(!user) return res.status(404).json({ status: "error", msg: "Usuario no encontrado"});
            await userService.delete(uid);
        
            res.status(200).json({status:"ok", msg: `Usuario eliminado con exito ${uid}`});
        } catch (error) {
            return next(error);
        };
    };

};