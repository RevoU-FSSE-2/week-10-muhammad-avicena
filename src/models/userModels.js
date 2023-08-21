const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
            required: true,
        },
        userPhone: {
            type: Number,
            required: true
        },
        userAdress: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const userModels = mongoose.model('User', userSchema);

module.exports = userModels;