import { productModel } from "./models/productModel.js";

export class ProductsDao {
    static async get(){
        return await productModel.find().lean();
    };
    
    static async getBy(filter){
        return await productModel.findOne(filter).lean();
    };

    static async create(data){
        return await productModel.create(data);
    };

    static async update(data){
        return await productModel.create(data);
    };

    static async delete(filter){
        return await productModel.findOneAndDelete(filter)
    };
}