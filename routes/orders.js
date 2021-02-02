import express from 'express';
import { v4 as uuidv4 } from "uuid";
import Order from '../models/orders.js';

const router = express.Router();

// GET ALL ITEMS
router.get('/',(req,res) => {
    Item.find({}).then(function(items){
        res.send(items);
    });
});
// GET ITEM BY ID
router.get('/:_id',(req, res) => {
    Item.findOne({_id: req.params._id}).then(item => {
        if(!item) return res.status(404).end();
        return res.status(200).json(item);
    }).catch(err => next(err));   
});
// ADD NEW ITEM
router.post("/", (req, res) => {
    let item = new Item(req.body);
    item.save();
    res.send(item);
});
// EDIT ITEM BY ID
router.put("/:id",(req, res) => {
    Item.findOne({_id: req.params._id}, function(err, item) {
        if(err) { 
            console.log(err);
            res.status(500).send("500 error dead");
        } else {
            if(!item) {
                res.status(404).send("400 dead");
            } else {
                if(req.body.code) item.code = req.body.code;
            }
            item.save().catch(err => next(err));
        }        
    });    
});
// DELETE ITEM BY ID
router.delete('items/delete/:_id', (req, res) => {
    Item.findOneAndDelete({_id: req.params._id}).then(item => {
        if(!item) return res.status(404).end();
        return res.status(200).send(`User ${req.params._id} deleted`);
    }).catch(err => next(err));  
});
export default router;