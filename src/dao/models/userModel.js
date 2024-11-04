import mongoose from "mongoose";

export const userModel = mongoose.model(
    "users",
    new mongoose.Schema(
        {
            first_name: String,
            last_name: String,
            email: { type: String, required: true, unique: true, index: true },
            password: { type: String, required: true },
            age: Number,
            role: { type: String, default: "user" },
            avatar: { type: String }
        },
        {
            timestamps: true
        }
    )
)
