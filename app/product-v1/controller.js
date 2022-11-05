const { ObjectId } = require("mongodb")
const db = require("../../config/mongodb")
const path = require('path')
const fs = require('fs')
let port = process.env.PORT || 3000 

const index = (req,res) => {
    db.collection('products').find().toArray()
    .then( result => res.send(result))
    .catch(error => res.send(error))
}
const view = (req,res) => {
    const {id} = req.params
    db.collection('products').findOne({_id : ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const store = (req,res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file

    if (image) {
            const fixImage = path.join(__dirname,'../../uploads', image.originalname);
            fs.renameSync(image.path, fixImage)
        
            db.collection('products').insertOne({name, price, stock, status, image_url:`http://localhost:${port}/public/${image.originalname}`})
            .then( result => res.send(result))
            .catch(error => res.send(error))
        } else {
            db.collection('products').insertOne({name, price, stock, status})
            .then( result => res.send(result))
            .catch(error => res.send(error))
    }
}

const update = (req, res) => {
    const {id} = req.params
    const {name, price, stock, status} = req.body;
    const image = req.file;

    if (image) {
        const fixImage = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, fixImage);

        db.collection('products').updateOne({_id: ObjectId(id)}, {$set: {name, price, stock, status, image_url:`http://localhost:${port}/public/${image.originalname}`}})
        .then(result => res.send(result))
        .catch(error => res.send(error))
    }else {
        db.collection('products').updateOne({_id: ObjectId(id)}, {$set: {name, price, stock, status}})
        .then(result => res.send(result))
        .catch(error => res.send(error))
    }
}

const destroy = (req,res) => {
    const {id} = req.params
    db.collection('products').deleteOne({_id: ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

module.exports = {
    index,
    store,
    view,
    update,
    destroy
}