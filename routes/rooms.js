const express     = require('express');
const router      = express.Router();
const Room        = require('../models/Room');

// GET all rooms
router.get('/',(req,res,next)=>{
    Room.find().exec().then((rooms) =>{
        res.json({
            success:true,
            data:rooms
        });
    }).catch( (err) => {
        res.json({
            success:false,
            message:"Error while fetching the rooms"
        });
    });
});

// POST new room
router.post("/",(req,res,next)=>{
    let room = new Room({
        name:req.body.name
    });
    room.save( (err,room) =>{
        if(err){
            res.json({
                success:false,
                message:"Error while saving the room"
            });
        }
        else{
            res.json({
                success:true,
                data:room
            });
        }
    });
});

// Delete room 
router.delete("/:id",(req,res,next)=>{
    roomId = req.params["id"];
    Room.findByIdAndRemove(roomId).exec().then(removedRoom=>{
        res.json({success:true,message:"room deleted successfuly"})
    }).catch(err=>{
        res.status(404);
        res.json({success:false,message:"Invalid room Id"})
    });
})
module.exports = router;