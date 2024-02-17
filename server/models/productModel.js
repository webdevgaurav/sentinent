const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    price: {
        type: String,
    },
    tags: {
        type: String,
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('products', productSchema);

module.exports = User;
