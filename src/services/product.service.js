import { ProductsDao as DAO} from "../dao/ProductDao.js";

class ProductService{
    constructor(dao){
        this.dao = dao;
    };
    
    async getProducts(){
        return await this.dao.get();
    };

    async getById(id){
        let resultado = await this.dao.get({_id:id});
        if(resultado.length>0) return resultado[0];
        
        return null;
    };

    async create(product){
        return await this.dao.create(product);
    };

    async update(filter, product){
        return await this.dao.update(filter, product);
    };

    async delete(filter){
        return await this.dao.delete(filter);
    };
}

export const productsService = new ProductService(DAO);