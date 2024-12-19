import { ProductsDao as DAO} from "../dao/ProductDao.js";

class ProductService{
    constructor(dao){
        this.dao = dao;
    };
    
    async getProducts(){
        return await this.dao.get();
    };

    async getById(pid){
        let resultado = await this.dao.getBy({_id: pid});
        return resultado;
    };

    async create(product){
        return await this.dao.create(product);
    };

    async update(pid, body, opts){
        return await this.dao.update({_id: pid}, body, opts);
    };

    async delete(pid){
        return await this.dao.delete({_id: pid});
    };
}

export const productsService = new ProductService(DAO);