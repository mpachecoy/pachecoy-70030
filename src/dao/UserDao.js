import { userModel } from "./models/userModel.js";

export class UserDao{
    static async get(){
        return await userModel.find().lean();
    };
    static async getBy(filter){
        return await userModel.findOne(filter).lean();
    };
    static async create(user){
        return await userModel.create(user);
    };
    static async updateUser(id, user){
        return await userModel.updateOne({_id:id} , user);
    };
    static async delete(filter){
        return await userModel.findOneAndDelete(filter)
    };
}