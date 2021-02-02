import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name: {
        type: String,
        required:[true,"required field"]
    }
});

const Order = mongoose.model('order',OrderSchema);

export default Order;