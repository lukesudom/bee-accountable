const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitsSchema = new Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
         name: {
            type: String,
            required: true,
         },
         iteration: {
            type: Number,
            required: true
         },
         count: {
            type: Number,
         },
         complete: {
            type: Boolean,
            default: false
         },
         description: {
            type: String,
         }
         
}, {
    timestamps: true
})

module.exports = mongoose.model('Habits', habitsSchema);





