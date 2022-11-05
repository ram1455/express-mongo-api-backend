const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type : String,
        required: [true, 'field name harus ada'],
        minlength: 3,
        maxlength: 50
    },

    price : { 
        type: Number,
        required: true,
        min : 1000,
        max : 100000000,
    },
    
    status: {
        type: Boolean,
        default: true
    },
    
    stock : {
        type: Number,
        required: true
    },
    image_url: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product