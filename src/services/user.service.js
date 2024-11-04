import { UserDao  as DAO } from "../dao/UserDao.js";

class UserService{
    constructor(dao){
        this.dao = dao;
    };

    async getUsers(){
        return await this.dao.get();
    };
    
    async getById(id){
        return await this.dao.getBy({_id:id});
    };
    
    async getUserByEmail(email){
        let user = await this.dao.getBy({ email });
        return user;
    };

    async create(user){
        return await this.dao.create(user);
    };

    async update(filter, user){
        return await this.dao.update(filter, );
    };

    async delete(filter){
        return await this.dao.delete(filter);
    };
};
 
export const userService = new UserService(DAO);