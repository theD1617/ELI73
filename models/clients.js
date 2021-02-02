import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
name: {
    type: String,
    required:[true,"required field"]
},
lname: {
    type: String,
    required:[true,"required field"]
},
age: {
    type: Number,
    required:[true,"required field"]
},
logg: {
    type: Object,
    nik: {
        type: String,
        required:[true,"required field"]
    },
    pin: {
        type: String,
        required:[true,"required field"]
    }    
},
_social: {
    type: Object,
    _email:{
        type: String,
        required:[true,"required field"]
    },
    _mobile:{
        type: String,
    },
    _ether:{
        type: String,
    }
},
_addresses:{
    type: Object,
    priv: [ String ],
    comp: [ String ]
},
_banking:{
    type: Object,
    _bank: String,
    _iban: String,
    _bic: String,
    _holder: String,
    _crdnr: String,
    _crddt: String,
    _cvc: String
},
orders:[{
    type: Object,
    _id: String,
    price:{
        type:Object,
        start: Number,
        bonus: Number,
        total: Number,
        tax: Number
    },
    clientstats:{
        type: Object,
        total: Number,
        numitems: Number,
        pricetop: Number,
        maxitems: Number
    },
    items:[{
        type: Object,
        _id:String,
        code: String,
        bprice: Number,
        amnt: Number,
        variant: Number,
        tprice: Number
    }]
}]
});

const Client = mongoose.model('client',ClientSchema);

export default Client;