import express from 'express';
import { v4 as uuidv4 } from "uuid";
import Client from '../models/clients.js';
import regValidation from './regValidation.js';
import logValidation from './logValidation.js';
import verify from './verify.js';

import Cryptr from 'cryptr';
import crypto from 'crypto';

import jwt from 'jsonwebtoken';


const router = express.Router();
const cryptr = new Cryptr(process.env.SAFE_CRYPTR);

// GET ALL Clients
router.get('/list/', (req, res) => {
    Client.find({}).then(function (clients) {
        res.send(clients);
    }).catch();
});

// GET CLIENT BY ID //
router.get('/one/:_id', verify, (req, res) => {
    Client.findOne({ _id: req.params._id }).then(client => {
        if (!client) return res.status(404).end();
        const name = cryptr.decrypt(client.name) + ' ' + cryptr.decrypt(client.lname);
        const email = cryptr.decrypt(client._social._email);
        return res.status(200).json(client.nik, client.age, name, email);
    });
});
// ADD NEW CLIENT
router.post("/sign", async (req, res) => {
    const { error } = regValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // DATA VALIDATED
    const hashPin = await crypto.createHash('md5').update(req.body.pin).digest('hex');
    const hashMail = await crypto.createHash('md5').update(req.body._social._email).digest('hex');
    const hashMobile = await crypto.createHash('md5').update(req.body._social._mobile).digest('hex');
    // md5 hashes
    Client.findOne({ nik: req.body.nik }).then(exists => { // look for nik ===
        //console.log(exists);
        if (exists) return res.status(404).send(`Nikname ${exists.nik} already exists`);
        // Name DOESNT EXIST

        if (req.body._social._email) {
            Client.findOne({ _ehash: hashMail }).then(nexists => { // look for ehash ===
                //console.log(nexists);
                if (nexists) return res.status(404).send(`Email ${req.body._social._email} already exists`);
                if (req.body._social._mobile) {
                    Client.findOne({ _mhash: hashMobile }).then(mexists => { // look for ehash ===
                        //console.log(mexists);
                        if (mexists) return res.status(404).send(`Mobile ${req.body._social._mobile} already exists`);


                        const client = new Client({
                            name: cryptr.encrypt(req.body.name),
                            lname: cryptr.encrypt(req.body.lname),
                            age: req.body.age,

                            nik: req.body.nik,
                            pin: hashPin,
                            _ehash: hashMail,
                            _mhash: hashMobile,
                            role: "ipb", // (i/a/f/v)in/active/factor/vector (p/o/e/m)pub online eth mobile (b/w/r/s) basic webby root sys

                            _social: {
                                _email: cryptr.encrypt(req.body._social._email),
                                _mobile: cryptr.encrypt(req.body._social._mobile),
                                _ether: req.body._social._ether
                            },
                            _addresses: {
                                priv: [],
                                comp: {}
                            },
                            _banking: {},
                            _orders: {}
                        });
                        client.save();
                        res.send(client);
                    });
                }
            });
        }

    });
});
// LOG IN EXISTING CLIENT
router.post("/log", async (req, res) => {
    const { error } = logValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const hashPin = await crypto.createHash('md5').update(req.body.pin).digest('hex');
    Client.findOne({ nik: req.body.nik }).then(client => { // look for nik ===
        //console.log(client);
        if (!client) return res.status(404).send(`Nikname ${req.body.nik} doesnt exists and/or Pins do not match`);
        if (client.pin !== hashPin) return res.status(404).send(`Nikname ${req.body.nik} doesnt exists and/or Pins do not match`);
        const token = jwt.sign({ _id: client._id, nik: client.nik, role: client.role }, process.env.SAFE_CRYPTR);
        const ret = { token, client };
        res.header('auth-token', token).status(200).json(ret);
    });
});
// EDIT CLIENT BY ID
router.put("/edit/:_id", verify, (req, res) => {
    Client.findOne({ _id: req.params._id }, function (err, client) {
        if (err) {
            console.log(err);
            res.status(500).send("500 error dead");
        } else {
            if (!client) {
                res.status(404).send("400 dead");
            } else {
                if (req.body.nik) client.nik = req.body.nik;
                if (req.body.pin) client.pin = req.body.pin;
                if (req.body._social._email) client._social._email = req.body._social._email;
                if (req.body._social._mobile) client._social._mobile = req.body._social._mobile;
                if (req.body._addresses.priv) client._addresses.priv = req.body._addresses.priv;
                if (req.body._addresses.comp) client._addresses.comp = req.body._addresses.comp;
                if (req.body._social._ether) client._social._ether = req.body._social._ether;
                if (req.body._banking._bank) client._banking._bank = req.body._banking._bank;
                if (req.body._banking._iban) client._banking._iban = req.body._banking._iban;
                if (req.body._banking._bic) client._banking._bic = req.body._banking._bic;
                if (req.body._banking._holder) client._banking._holder = req.body._banking._holder;
                if (req.body._banking._crdnr) client._banking._crdnr = req.body._banking._crdnr;
                if (req.body._banking._crddt) client._banking._crddt = req.body._banking._crddt;
                if (req.body._banking._cvc) client._banking._cvc = req.body._banking._cvc;
                if (req.body.orders.id) client.orders.id = req.body.orders.id;
                if (req.body.orders.price.start) client.orders.price.start = req.body.orders.price.start;
                if (req.body.orders.price.bonus) client.orders.price.bonus = req.body.orders.price.bonus;
                if (req.body.orders.price.total) client.orders.price.total = req.body.orders.price.total;
                if (req.body.orders.price.tax) client.orders.price.tax = req.body.orders.price.tax;
                if (req.body.orders.clientstats.total) client.orders.clientstats.total = req.body.orders.clientstats.total;
                if (req.body.orders.clientstats.numitems) client.orders.clientstats.numitems = req.body.agorders.clientstats.numitems;
                if (req.body.orders.clientstats.pricetop) client.orders.clientstats.pricetop = req.body.orders.clientstats.pricetop;
                if (req.body.orders.clientstats.maxitems) client.orders.clientstats.maxitems = req.body.orders.clientstats.maxitems;
                if (req.body.items) client.items = req.body.items;
            }
            client.save().catch(err => next(err));
        }
    });
});
// DELETE CLIENT BY ID
router.delete('/delete/:_id', verify, (req, res) => {
    Client.findOneAndDelete({ _id: req.params._id }).then(client => {
        if (!client) return res.status(404).end();
        return res.status(200).send(`User ${req.params._id} deleted`);
    }).catch(err => next(err));
});

// @route   GET clients/auth
// @action  GET Client Data
// @access  PRIVATE GET
router.get('/auth', verify, (req, res) => {
    Client.findById(req.client._id)
        .select('-pin')
        .then(client => res.jsom(client))
        .catch(err => res.status(401).send(req.client._id + 'access denied'));
});

export default router;

