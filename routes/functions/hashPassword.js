const bcrypt =require('bcrypt')
exports.func = async (password) => {
    let hashPassword;
    try {
        hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
        throw new Error(err)
    }
    return hashPassword
}