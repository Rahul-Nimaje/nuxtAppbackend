const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const fn = {}


const files_in_folder = fs.readdirSync(__dirname);
// console.log(files_in_folder);
for (let i = 0; i < files_in_folder.length; i++) {
    const file = files_in_folder[i];
    if ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')) {
        const function_module = require(path.join(__dirname, file))
        fn[file.replace('.js', '')] = function_module.func;
    }
}

module.exports = fn;