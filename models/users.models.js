let mongoose = require('mongoose');
let bcrtypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    //phoneNumber: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    password: String,
    role: { type: String, required: true },
    avatar: { type: String, default: 'default.jpg' },
    userInfo: { type: String },
    addedAt: { type: Date, default: Date.now },
    ip: { type: String }
});

userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew()) this.password = bcrtypt.hashSync(this.password, 12);
    next();
});

module.exports = mongoose.model('UsersModel', userSchema);