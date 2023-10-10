const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    dni: { type: Number, required: true},
    username: { type: String, required: true},
    name: { type: String, required: true},
    lastName: { type: String, required: true},
    password: { type: String, required: true}
}, { timestamps: true, versionKey: false});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;