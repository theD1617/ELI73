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

app.use(bodyParser.json());

var whitelist = ['*', 'https://s47el173.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));
//Client Base
app.use('/clients', clientRoutes);
app.use('/items',  itemRoutes);
app.use('/orders', orderRoutes);

// LANDING PAGE
app.get('/', (req,res) => { res.send("ELI73 :: veritas latet ultra lux <br><a href='items'>Item List</a>"); });


app.listen(PORT, () => {console.log(`Server running on : http://${HOST}:${PORT}`)});


