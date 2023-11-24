const jwt = require('jsonwebtoken');
let token;
exports.func=async(user)=>{
try{
    token = await jwt.sign({ user }, process.env.secretKey, { expiresIn: '24h' });
}catch(err){
    throw new Error(err)
}
return token;
}