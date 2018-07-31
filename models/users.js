const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
});


module.exports.comparePassword = function (myPlaintextPassword, hash, callback) {
    bcrypt.compare(myPlaintextPassword, hash, function (err, res) {
        if (err) throw err
        callback(null, res)
    });

}

module.exports.getUserByEmail = function (email, callback) {
    let query = {
        'email': email
    }
    User.findOne(query, callback)
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback)
}







let User = module.exports = mongoose.model('User', UserSchema)