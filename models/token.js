const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

// TokenSchema.pre('save', async function(next) {
//     const user = this;
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 10);
//     }
//     next();
// });

module.exports = mongoose.model('Token', TokenSchema);