import mongoose from "mongoose";

export const productModel = mongoose.model(
    "products",
    new mongoose.Schema(
        {
            title: { type: String, unique: true },
            description:  String ,
            stock: { type: Number, required: true, default: 0  },
            code: { type: String, required: true, unique: true },
            category: String ,
            price: { type: Number, default: 0 },
            avatar: { type: Array, default: [] },
        },
        {
            timestamps: true, strict: false
        }
))

