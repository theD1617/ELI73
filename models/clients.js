import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: [true, "required field"],
        max: 1024
    },
    lname: {
        type: String,
        required: [true, "required field"],
        max: 1024
    },
    age: {
        type: Number,
        required: [true, "required field"],
        max: 1024
    },

    nik: {
        type: String,
        required: false,
        min: 6,
        max: 25
    },
    pin: {
        type: String,
        required: [true, "required field"],
        max: 1024
    },
    role: {
        type: String,
        required: [true, "required field"],
        max: 9
    },
    _ehash: {
        type: String,
        required: false,
        max: 1024
    },
    _mhash: {
        type: String,
        required: false,
        max: 1024
    },
    act: {
        type: String,
        required: true,
        max: 9
    },
    _social: {
        type: Object,
        _email: {
            type: String,
            required: false,
            max: 1024
        },

        _mobile: {
            type: String,
            required: false,
            max: 1024

        },
        _ether: {
            type: String,
            required: false,
            max: 1024
        }
    },
    _addresses: {
        type: Object,
        priv: [String],
        comp: [String]
    },
    _banking: {
        type: Object,
        _bank: String,
        _iban: String,
        _bic: String,
        _holder: String,
        _crdnr: String,
        _crddt: String,
        _cvc: String
    },
    orders: [{
        type: Object,
        _id: String,
        price: {
            type: Object,
            start: Number,
            bonus: Number,
            total: Number,
            tax: Number
        },
        clientstats: {
            type: Object,
            total: Number,
            numitems: Number,
            pricetop: Number,
            maxitems: Number
        },
        items: [{
            type: Object,
            _id: String,
            code: String,
            bprice: Number,
            amnt: Number,
            variant: Number,
            tprice: Number
        }]
    }]
});

const Client = mongoose.model('client', ClientSchema);

export default Client;