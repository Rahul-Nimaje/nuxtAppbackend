const { user, sequelize: sequelizeTransaction } = require('../../../models');
const Op = require('sequelize').Op;
const comparePassword = require('./comaparePassword');
const generateToken = require('./generateToken')

exports.func = async (params, runningTransaction) => {
   
    if (!params) {
        throw new Error('Parameter not found')
    }
    let userInfo;
    let t = runningTransaction || await sequelizeTransaction.transaction();
    try {
        const findUser = await user.findOne({
            where: {
                [Op.or]: {
                    mobile: params.username,
                    emailid: params.username
                }
            },
            transaction: t,
            raw: true
        });
        if (!findUser) {
            throw new Error('User not found')
        }
        let passwordMatch = await comparePassword.func(findUser.password, params.password);
        if (!passwordMatch) throw new Error('Password not Match');
        let token = await generateToken.func(findUser);
        // findUser.update({token:token});
        userInfo={...findUser,token}
        if (!runningTransaction) await t.commit();
    } catch (err) {
        if (!runningTransaction) await t.rollback();
        throw new Error(err)
    }
    return userInfo
}