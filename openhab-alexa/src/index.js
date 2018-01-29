import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { log } from 'util';
import axios from 'axios';

let PORT = 8080;
var config = { port: null };

let httpClient = axios.create({
    headers: {"Content-Type": "text/plain",  "Accept": "application/json"}
})
let app = express();
app.server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Hello GET from Express!')
})

app.post('/', (request, response) => {
    console.log(request.body.amount)
    var alexaRequest = request.body
    var dimmerPercentage = 0
    if (alexaRequest.amount === "ON") {
        dimmerPercentage = 100;
    } else if (alexaRequest.amount === "OFF") {
        dimmerPercentage = 0;
    } else {
        dimmerPercentage = alexaRequest.amount;
    }
    const openhabReq = {
        url: "http://openhab:8080/rest/items/Kitchen_Light_Dimmer",
        //url: "http://openhab:8080" + "/rest/items/" + alexaRequest.item,
        payload: dimmerPercentage
    }

    const logMessage = "Sending HTTP GET with body '"+openhabReq.payload+"' to " + openhabReq.url
    httpClient.post(openhabReq.url, openhabReq.payload)
         .then(response => console.log(response))
         .catch(err => console.log(err));
    response.send('Hello from Express! ' + logMessage)
})

app.server.listen(process.env.PORT || config.port || PORT, () => {
    console.log(`Started on port ${app.server.address().port}`);
});
    

export default app;