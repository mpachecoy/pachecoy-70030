import { productModel } from "./models/productModel.js";

export class ProductsDao {
    static async get(){
        return await productModel.find().lean();
    };
    
    static async getBy(pid){
        return await productModel.findOne({_id: pid}).lean();
    };

    static async create(data){
        return await productModel.create(data);
    };

    static async update(pid, data, opts){
        return await productModel.updateOne({_id: pid}, data, opts);
    };

    static async delete(filter){
        return await productModel.findOneAndDelete(filter)
    };
}