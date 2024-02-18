const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'productModel'
    },
    phasesId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'phasesModel'
    },
    creatorId: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    tags: {
        type: String,
    },
    rating: {
        type: Number,
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
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

const Module = mongoose.model('module', moduleSchema);

module.exports = Module;
