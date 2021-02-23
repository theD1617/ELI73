import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    code: { type: String, required: [true, "required field"] },
    name: { type: String, required: [true, "required field"] },
    date: { type: String },
    prod: { type: String },
    desc: { type: String },
    kat: { type: String },
    color: { type: String },
    gender: { type: String },
    media: [String],
    noten: {
        type: Object,
        kopf: [String],
        herz: [String],
        base: [String],
        duftnoten: [String]
    },
    variants: [{
        group: String,
        variant: String,
        xcosts: Number,
        data: String
    }],
    attributes: [{
        group: String,
        variant: String,
        xcosts: Number,
        data: String,
        dimensions: {
            height: Number,
            width: Number,
            depth: Number,
            gewicht: Number
        }
    }],
    price: {
        type: Number,
        required: false
    },
    xdata: {
        type: Object,
        together: [String],
        combo: [String],
        similar: [String],
        liked: [String],
        faved: [String],
        commented: [{
            user: String,
            date: Date,
            msg: String
        }]
    }


});

const Item = mongoose.model('item', ItemSchema);

export default Item;