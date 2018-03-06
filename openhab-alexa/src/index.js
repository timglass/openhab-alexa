import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { log } from 'util';

import router from './routes'

let PORT = 8080;
var config = { port: null };


let app = express();
app.server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/alexa' , router);

app.server.listen(process.env.PORT || config.port || PORT, () => {
    console.log(`Started on port ${app.server.address().port}`);
});
    

export default app;