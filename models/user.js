// models/user.js
'use strict';
const { DataTypes } = require('sequelize');
let hashPassword = require('../routes/functions/hashPassword')
module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },  
        mobile: {
            type: DataTypes.STRING,
        },
        emailid: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        token:{
            type: DataTypes.TEXT,
        },
        image:{
            type: DataTypes.TEXT,
        }
    });

    User.beforeCreate(async(user) => {
        console.log("userssssss", user);
        try {
            const hashPasswords =await hashPassword.func(user.password);
            console.log("hashPassword",hashPasswords);
            user.password=hashPasswords
        } catch (err) {
            throw new Error(err)
        }
    })
    return User;
};

