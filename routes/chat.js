const express     = require('express');
const app         = express();
const router      = express.Router();
const http       = require("http");
const Chat        = require('../models/Chat');
const room        = require("../models/Room");

// POST a new chat message
router.post('/', (req, res, next) => {
  room.findById(req.body.roomId,(err,doc)=>{
    if(err){
      res.status(400);
      res.json({success:false,message:`InCorrent roomId`});
    }
    else{
      let chat = new Chat({
        nickname: req.body.nickname,
        room: doc.name,
        message: req.body.message,
        createdAt: req.body.createdAt
      });
      chat.save((err,chat)=>{
        if(err){
          res.json({
            success:false,
            message:"Error while saving the message"
          });
        }
        else{
          res.json({
            success:true,
            data:chat
          });
        }
      });
    }
  });
});

// GET chat messages
router.get("/",(req,res,next)=>{
  // If ?roomId={id} is exist , get chat messages for this room
  if(req.query.roomId){
    room.findById(req.query.roomId,(err,doc)=>{
      if(err){
        res.status(400);
        res.json({success:false,message:"Room is not found!"});
      } 
      else if(!doc){
        res.status(400);
        res.json({success:false,message:"Room is not found"});
      }
      else{
        Chat.find({
          room:doc.name
        }).exec().then(messages => {
          res.json({
            success:true,
            data:messages
          });
        }).catch(err=>{
          res.status(400);
          res.json({
            success:false,
            messages:"Room is not found!"
          });
        }); 
      }
    });
  }
  // else get all chat messages for all rooms
  else{
    Chat.find().exec().then((messages) =>{
      res.json({
            success:true,
            data:messages
      });
    }).catch( (err) => {
        res.json({
            success:false,
            message:"Error while fetching chat messages"
        });
    });
  }
});

// Delete Chat messages for specific room 
router.delete("/:id",(req,res,next)=>{
  id = req.params["id"];
  if(!id){
    res.status(400);
    res.json({success:false,message:"Id is not found"})
  }
  else{
    room.findById(id,(err,doc)=>{
      if(err){
        res.status(400);
        res.json({success:false,message:"Invalid room id"})
      }
      else if(!doc){
        res.status(400);
        res.json({success:false,message:"Invalid room id"})        
      }
      else{
        Chat.find({room:doc.name}).remove().exec(err =>{
          if(err){
            res.json({success:false,message:`Cannot remove ${doc.name} room messages`})
          }
          else{
            res.json({success:true,message:`${doc.name} room messages are deleted successfuly`})
          }
        })
      }
    })
  }
})

// Delete all chat messages for all rooms
router.delete("/",(req,res,nex)=>{
  Chat.find().remove().exec(err=>{
    if(err){
      res.json({success:false,message:"Failed to remove chat messages"});
    }
    else{
      res.json({success:true,message:"All chat message are removed successfuly"});
    }
  })
});

module.exports = router;
