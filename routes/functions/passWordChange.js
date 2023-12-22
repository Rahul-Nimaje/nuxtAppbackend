const { user, sequelize: sequelizeTransaction } = require('../../models');
const hashPassword = require('./hashPassword');
const Op = require('sequelize').Op
const httpContext = require('express-http-context');
exports.func = async (params, runningTransaction) => {
    let t = runningTransaction || await sequelizeTransaction.transaction();
    let userInfo;
    console.log('httpContext.........', httpContext.get('Loggedinuser'))
    try {
        if (params) {
            let data = params.id ? params : {};
            if (params.password) {
                data.password = await hashPassword.func(params.password);
            }
            await user.update(data, {
                where: {
                    [Op.or]: {
                        emailid: params.emailid,
                        mobile: params.mobile
                    }
                },
                returning: true,
                plain: true,
                transaction: t
            })
            if (params.id) {
                userInfo = await user.findOne({
                    where: {
                        id: params.id
                    },
                    transaction: t
                })
            }

        }
        if (!runningTransaction) await t.commit();
    } catch (err) {
        if (!runningTransaction) await t.rollback();
        throw new Error(err)
    }
    return userInfo || "Password Changed"
}
