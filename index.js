import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import clientRoutes from './routes/clients.js';
import itemRoutes from './routes/items.js';
import orderRoutes from './routes/orders.js';
import mongoose from 'mongoose';

// Schemas
// import Client from './models/clients.js';
// import Item from './models/items.js';
// import OrderSchema from './models/orders.js';


const app = express();

mongoose.connect(
    process.env.MONGO_ADMIN, 
    { useUnifiedTopology: true, useNewUrlParser: true }
    );
mongoose.Promise = global.Promise;


const HOST = "localhost"
const PORT = process.env.PORT || 3090; 

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json());
//Client Base
app.use('/clients', cors(corsOptions), clientRoutes);
app.use('/items', cors(corsOptions), itemRoutes);
app.use('/orders', cors(corsOptions), orderRoutes);

// LANDING PAGE
app.get('/', cors(corsOptions), (req,res) => { res.send("ELI73 :: veritas latet ultra lux <br><a href='items'>Item List</a>"); });


app.listen(PORT, () => {console.log(`Server running on : http://${HOST}:${PORT}`)});


