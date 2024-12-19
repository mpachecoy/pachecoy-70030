import mongoose from "mongoose";

export const productModel = mongoose.model(
    "products",
    new mongoose.Schema(
        {
            title: { type: String, require: true },
            description: { type: String },
            stock: { type: Number, default: 0  },
            code: { type: String, unique: true },
            category: { type: String, default: "Varios" } ,
            price: { type: Number, default: 0 },
            avatar: { type: Array, default: "https://s1.significados.com/foto/producto-og.jpg" },
        },
        {
            timestamps: true, strict: false
        }
))

