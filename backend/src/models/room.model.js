import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    roomId: { type: String, unique: true, required: true },
    owner: { type: String },
    createdAt: { type: Date, default: Date.now },

})