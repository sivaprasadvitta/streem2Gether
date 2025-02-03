import express from "express";
import {v4 as uuidv4} from 'uuid'

const roomRouter = express.Router();

roomRouter.post('/api/rooms',async (req,res)=>{
    try{
        const roomId = uuidv4();
        // const room 
        res.status(200).json({roomId})

    }catch(error){
        res.status(500).json({error:"Room creation failed"})
    }
})

export default roomRouter