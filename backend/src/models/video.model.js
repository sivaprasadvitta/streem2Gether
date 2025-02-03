import mongoose from "mongoose";

const CurrentVideoSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    status: { type: String, enum: ['playing', 'paused'], default: 'paused' },
    currentTime: { type: Number, default: 0 },
});



export default mongoose.model("Video",CurrentVideoSchema);
