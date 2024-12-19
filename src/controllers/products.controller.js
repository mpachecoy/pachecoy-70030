import { productsService } from "../services/product.service.js";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import CustomError from "../utils/errors/CustomError.utils.js";
import errors from "../utils/errors/errors.js";

export default class ProductController{
    static async getProducts(req, res, next){
        try {
            const { limit, page, sort } = req.query;
    
            const options = {
                limit: limit || 10,
                page: page || 1,
                sort: {
                    price: sort === "asc" ? 1 : -1,
                },
            };
    
            const products = await productsService.getProducts({}, options )
        
            res.status(200).json({ status:"ok", products });
        } catch (error) {
            return next(error)
        };
    };

    static async getBy(req, res, next){
        try {
            let { pid } = req.params;
            console.log(pid)
            let product = await productsService.getById(pid);
            if(!product) return res.status(404).json({ status: "error", msg:"Prodcuto no encontrado"});
        
            res.status(200).json({status:"ok", product});
        } catch (error) {
            return next(error)
        };
    };

    static async update(req, res, next){
        try {
            const { pid } = req.params;
            const body = req.body;
            const opts = { new: true }
            const product = await productsService.update(pid, body, opts);           
            res.status(200).json({ status:"ok", product });
        } catch (error) {
            return next(error)
        };
    };

    static async create(req, res, next){
        try {
            const { title, price, code } = req.body;        
            if (!title || !price || !code ) {
                CustomError.newError(errors.error);
            }
            const body = req.body;
            const newProduct = await productsService.create(body);
    
            res.status(201).json({ status: "ok", newProduct });
    
        } catch (error) {
            return next(error);
        };
    };

    static async createMock(req, res, next){
        try {
            const { quantity } = req.params;
            for (let i = 0; i <= quantity; i++) {
                const title = faker.commerce.productName();
                const description = faker.commerce.productDescription();
                const price = faker.commerce.price({ min: 100, max: 200, dec: 0 });
                const data = {
                    title,
                    description,
                    price,
                    stock: Math.floor(Math.random() * (100 - 10 + 1)),
                    code: uuid(),
                    avatar: faker.image.avatar()
                }
                const one = await productsService.create(data)
            }
            return res.status(201).json({
                message: quantity + "MOCK PRODUCT CREATED"
            })
        } catch (error) {
            return next(error);
        }
    }

    static async delete(req, res, next){
        try {
            const { pid } = req.params;
            const product = await productsService.delete(pid);
            if(!product) return res.status(404).json({ status: "error", msg: "Prodcuto no encontrado"});
            await productsService.delete(pid);
        
            res.status(200).json({status:"ok", msg: `Producto eliminado con exito ${pid}`});
        } catch (error) {
            return next(error);
        };
    }
}