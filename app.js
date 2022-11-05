require('./config/mongoose')
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan')

const path = require('path');

const productV1 = require(`./app/product-v1/routes`);
const productV2 = require('./app/product-v2/routes');

let port = process.env.PORT || 3000;

// app.use(path, middleware)
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'uploads')))

// app.use('/api/v1', productV1);
app.use('/api/v2', productV2);

app.listen(port, ()=> {
    console.log(`server listening in http://localhost:${port}/api/v2/product`);
})