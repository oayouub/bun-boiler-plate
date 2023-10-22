const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// hash the password with Bun.password.hash()
UserSchema.pre('save', async function (this: any, next: Function) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hash = await Bun.password.hash(user.password, 'bcrypt');
        user.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model("User", UserSchema);
