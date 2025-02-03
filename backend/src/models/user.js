import mongoose from 'mongoose';

const user = mongoose.Schema({
    username:{
        type:String,
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User",user);