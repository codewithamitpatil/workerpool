const bcrypt = require('bcryptjs');

const genrateHash = async (str) => {
    const hash = await bcrypt.hash(str, 10);
    return hash;

    // for (let i = 0; i < 1000; i++) {

    // }

    // return str;

}

const compareHash = async (p1, p2) => {
    const result = await bcrypt.compare("amit", p1);
    console.log(result)
    return result;
}


module.exports = {
    genrateHash,
    compareHash
}