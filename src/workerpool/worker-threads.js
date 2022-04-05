const WorkerPool = require('workerpool')
const Utilities = require('../util')

// MIDDLEWARE FUNCTIONS
const bcryptHash = (str) => {
    return Utilities.genrateHash(str);
}

// CREATE WORKERS

WorkerPool.worker({
    bcryptHash
})