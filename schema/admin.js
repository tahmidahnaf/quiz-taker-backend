let mongoose = require('mongoose');

let idChildren = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    time: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
    }
})

let schema = mongoose.Schema({
    id: {type : String , index: true},
    admin: idChildren,
    participants: [{
        name: {
            type: String,
            required: true,
            index: true
        },
        time: {
            type: String,
            required: true,
        },
        questions: {
            type: Array,
            required: true,
        },
        marks : Number,
    }]
})

schema.index({ id: 1, "admin.name": 1 }, { unique: true });

module.exports  = schema