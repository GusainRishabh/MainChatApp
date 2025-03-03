import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        profilePhoto: { type: String, required: true },
        gender: { type: String, enum: ["male", "female"], required: true },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
