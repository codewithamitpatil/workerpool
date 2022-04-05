const express = require('express');
const cors = require('cors');
const WorkerCon = require('./workerpool/controller')
const os = require('os');
const {
    genrateHash
} = require('./util');
const port = process.env.PORT || 4004;
process.env.UV_THREADPOOL_SIZE = os.cpus().length;

let iot = os.cpus().length;


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
        minWorkers: iot,
        maxWorkers: 16
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
