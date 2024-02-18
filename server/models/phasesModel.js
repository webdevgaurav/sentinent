const mongoose = require('mongoose');

const phasesSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'productModel'
    },
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

const Phase = mongoose.model('phases', phasesSchema);

module.exports = Phase;
