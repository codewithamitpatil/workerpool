const express = require('express');
const cors = require('cors');
const WorkerCon = require('./workerpool/controller')

const {
    genrateHash
} = require('./util');
const port = process.env.PORT || 4004;
process.env.UV_THREADPOOL_SIZE = 2;



const app = express();

app.use(cors('*'));

app.get('/b', async (req, res) => {
    const password = "amit";
    let result = null
    let workerPool = null

    workerPool = WorkerCon.get()
    result = await workerPool.bcryptHash(password)

    res.send(result)
})



app.get('/', async (req, res) => {
    const hash = await genrateHash('amit');
    res.send('hello amit');
});

const Worker = async () => {
    const options = {
        minWorkers: 2,
        maxWorkers: 2
    }
    await WorkerCon.init(options);

    Server();
}

const Server = () => {


    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}


Worker();