const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
        },
        lastname: {
            type: String,
            trim: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        userinfo: {
            type: String,
            trim: true,
        },
        //TODO: come back here
        encry_password: {
            type: String,
            required: true,
        },
        salt: String,
        role: {
            type: Number,
            default: 0,
        },
        purchases: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true } // It stores the time of the data created in the database
);

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password; //_password is a private variable, "_" is use to declare private variables
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return ""; // Refer to this later as this may be wrong
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainpassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};

module.exports = mongoose.model("User", userSchema);
