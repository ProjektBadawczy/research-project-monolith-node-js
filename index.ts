import express from 'express';
import {route} from "./routes";
import cluster from 'cluster';
import os from "os";

const app = express();
const cpuCount = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    app.use('/', route);

    app.listen(8001, () => {
        console.log('Server started');
    });
  
    // Fork workers.
    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } 
