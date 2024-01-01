const bcrypt =require('bcrypt');
exports.func=async(hashPassword,plainPassword)=>{
return  await bcrypt.compare(plainPassword,hashPassword);
}