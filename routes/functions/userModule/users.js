const { user, sequelize: sequelizeTransaction } = require('../../../models');
const sequelize=require('sequelize')
const Op =sequelize.Op
exports.func = async (params, runningTransaction) => {
    let userData;
    let t = runningTransaction || await sequelizeTransaction.transaction();
    try {
         const [findUser,createUser]=await user.findOrCreate({
            where:{
                [Op.or]:{
                    mobile:params.mobile,
                    emailid:params.emailid
                }
            },
            defaults:params,
            transaction:t
        });
        userData=createUser?findUser:'User Alredy Created'
        if (!runningTransaction) await t.commit()
    }
    catch (err) {
        if (!runningTransaction) await t.rollback()
            throw new Error(err)
    }
    return userData
}