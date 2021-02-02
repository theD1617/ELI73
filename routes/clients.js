import express from 'express';
import { v4 as uuidv4 } from "uuid";
import Client from '../models/clients.js';

const router = express.Router();

// GET ALL Clients
router.get('/',(req,res) => {
    Client.find({}).then(function(clients){
        res.send(clients);
    }).catch();
} );
// GET CLIENT BY ID
router.get('/:_id',(req, res) => {
    Client.findOne({_id: req.params._id}).then(client => {
        if(!client) return res.status(404).end();
        return res.status(200).json(client);
    });   
});
// ADD NEW CLIENT
router.post("/", (req, res) => {
    let client = new Client(req.body);
    client.save();
    //Client.create(req.body).then(function(client){ });
    
    res.send(client);
});
// EDIT CLIENT BY ID
router.put("/:_id",(req, res) => {
    Client.findOne({_id: req.params._id}, function(err, client) {
        if(err) { 
            console.log(err);
            res.status(500).send("500 error dead");
        } else {
            if(!client) {
                res.status(404).send("400 dead");
            } else {
                if(req.body.name) client.name = req.body.name;
                if(req.body.lname) client.lname = req.body.lname;
                if(req.body.age) client.age = req.body.age;
                if(req.body.logg.nik) client.logg.nik = req.body.logg.nik;
                if(req.body.logg.pin) client.logg.pin = req.body.logg.pin;
                if(req.body._social._email) client._social._email = req.body._social._email;
                if(req.body._social._mobile) client._social._mobile = req.body._social._mobile;
                if(req.body._addresses.priv) client._addresses.priv = req.body._addresses.priv;
                if(req.body._addresses.comp) client._addresses.comp = req.body._addresses.comp;
                if(req.body._social._ether) client._social._ether = req.body._social._ether;
                if(req.body._banking._bank) client._banking._bank = req.body._banking._bank;
                if(req.body._banking._iban) client._banking._iban = req.body._banking._iban;
                if(req.body._banking._bic) client._banking._bic = req.body._banking._bic;
                if(req.body._banking._holder) client._banking._holder = req.body._banking._holder;
                if(req.body._banking._crdnr) client._banking._crdnr = req.body._banking._crdnr;
                if(req.body._banking._crddt) client._banking._crddt = req.body._banking._crddt;
                if(req.body._banking._cvc) client._banking._cvc = req.body._banking._cvc;      
                if(req.body.orders.id) client.orders.id = req.body.orders.id;
                if(req.body.orders.price.start) client.orders.price.start = req.body.orders.price.start;          
                if(req.body.orders.price.bonus) client.orders.price.bonus = req.body.orders.price.bonus;
                if(req.body.orders.price.total) client.orders.price.total = req.body.orders.price.total;
                if(req.body.orders.price.tax) client.orders.price.tax = req.body.orders.price.tax;
                if(req.body.orders.clientstats.total) client.orders.clientstats.total = req.body.orders.clientstats.total;
                if(req.body.orders.clientstats.numitems) client.orders.clientstats.numitems = req.body.agorders.clientstats.numitems;
                if(req.body.orders.clientstats.pricetop) client.orders.clientstats.pricetop = req.body.orders.clientstats.pricetop;
                if(req.body.orders.clientstats.maxitems) client.orders.clientstats.maxitems = req.body.orders.clientstats.maxitems;
                if(req.body.items) client.items = req.body.items;
            }
            client.save().catch(err => next(err));
        }        
    });    
});
// DELETE CLIENT BY ID
router.delete('/delete/:_id', (req, res) => {
    Client.findOneAndDelete({_id: req.params._id}).then(client => {
        if(!client) return res.status(404).end();
        return res.status(200).send(`User ${req.params._id} deleted`);
    }).catch(err => next(err));  
});

export default router;