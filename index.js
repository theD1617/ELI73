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
const whitelist = ['http://localhost:3000', 'https://s47el173.herokuapp.com/', "*"]

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    if(!origin) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var message = 'The CORS policy for this origin doesnt ' +
                'allow access from the particular origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('X-XSS-Protection', 0);
    next();
});
// Then pass them to cors:

//Client Base
app.use('/clients', clientRoutes);
app.use('/items',  itemRoutes);
app.use('/orders', orderRoutes);




// LANDING PAGE
app.get('/', (req,res) => { res.send("ELI73 :: veritas latet ultra lux <br><a href='items'>Item List</a>"); });


app.listen(PORT, () => {console.log(`Server running on : http://${HOST}:${PORT}`)});


