const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: String
    }
})

module.exports = mongoose.model('comment', commentSchema)