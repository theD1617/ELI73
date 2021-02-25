import express from 'express';
import { v4 as uuidv4 } from "uuid";
import Order from '../models/orders.js';
import regValidation from './regValidation.js';
import logValidation from './logValidation.js';
import verify from './verify.js';

import Cryptr from 'cryptr';
import crypto from 'crypto';

import jwt from 'jsonwebtoken';


const router = express.Router();
const cryptr = new Cryptr(process.env.SAFE_CRYPTR);

// @route   GET orders/list
// @action  GET All Order Data
// @access  PRIVATE GET
router.get('/list', (req, res) => {
    Order.find({}).then(function (orders) {
        res.send(orders);
    });
});
// @route   GET orders/one/:_id
// @action  GET Order Data
// @access  PRIVATE GET
router.get('/one/:_id', (req, res) => {
    Order.findOne({ _id: req.params._id }).then(order => {
        if (!order) return res.status(404).end();
        return res.status(200).json(order);
    }).catch(err => next(err));
});
// @route   POST orders/new
// @action  POST NEW Order Data
// @access  PRIVATE POST
router.post("/new", (req, res) => {
    let order = new Order(req.body);
    order.save();
    res.send(order);
});
// @route   PUT orders
// @action  PUT EDIT Order Data
// @access  PRIVATE PUT
router.put("/edit/:id", (req, res) => {
    Order.findOne({ _id: req.params._id }, function (err, order) {
        if (err) {
            console.log(err);
            res.status(500).send("500 error dead");
        } else {
            if (!order) {
                res.status(404).send("400 dead");
            } else {
                if (req.body.code) order.code = req.body.code;
            }
            order.save().catch(err => next(err));
        }
    });
});
// @route   DELETE orders/delete/:_id
// @action  DELETE Order Data
// @access  PRIVATE DELETE
router.delete('/delete/:_id', (req, res) => {
    Order.findOneAndDelete({ _id: req.params._id }).then(order => {
        if (!order) return res.status(404).end();
        return res.status(200).send(`User ${req.params._id} deleted`);
    }).catch(err => next(err));
});
export default router;