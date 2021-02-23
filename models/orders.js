import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name: {
        type: String,
        required: [true, "required field"]
    },
    odate: {
        type: Date,
        required: false
    },
    salesPoint: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    order: [
        {
            item: {
                code: {
                    type: String,
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                },
                sprice: {
                    type: Number,
                    required: true,
                },
                variants: {
                    type: String,
                    required: true
                },
                attributes: {
                    type: String,
                    required: true
                }
            }
        }
    ],
    costs: {
        total: {
            type: Number,
            required: true
        },
        bonus: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
            required: true
        }
    }

});

const Order = mongoose.model('order', OrderSchema);

export default Order;