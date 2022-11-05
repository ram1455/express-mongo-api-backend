const Product = require('./model');
const path = require('path')
const fs = require('fs')
const { ObjectId } = require('mongodb');

let port = process.env.PORT || 3000

const index = (req,res) => {
    Product.find()
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const view = (req,res) => {
    const {id} = req.params
    Product.findById(id)
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const store = (req,res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file
    
    if (image) {
        const fixImage = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, fixImage)
        
        Product.create({name, price, stock, status, image_url:`https://express-mongo-api-backend.herokuapp.com/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error))
        
    } else {
        Product.create({name, price, stock, status})
        .then(result => res.send(result))
        .catch(error => res.send(error))

    }
}

const update = (req, res) => {
    const {id} = req.params
    const {name,price,stock,status} = req.body
    const image = req.file
    
    if (image) {
        const fixImage = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, fixImage)

        Product.findByIdAndUpdate({id},{name,price,stock,status, image_url:`http//localhost:${port}/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error))
    } else {
        
        Product.findByIdAndUpdate({id},{name,price,stock,status})
        .then(result => res.send(result))
        .catch(error => res.send(error))
    }
}

const destroy = (req,res) => {
    const {id} = req.params

    Product.deleteOne({_id: ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}