import axios from 'axios';
import { log } from 'util';
import generateOpenHabRequestPayload from './alexaHandlers'
import lookupDevice from './deviceDatabase'
import express from 'express'
const router = express.Router();

let httpClient = axios.create({
    headers: {"Content-Type": "text/plain",  "Accept": "application/json"}
})

router.get('/', (request, response) => {
    response.send('Hello GET from Express!')
})

router.post('/', (request, response) => {
    //console.log(request.body)
    var alexaRequest = request.body
    const determineDevice = lookupDevice(alexaRequest.device, alexaRequest.namespace)
    const requestPayload = generateOpenHabRequestPayload(alexaRequest);

    if (requestPayload != null) {
        const openhabReq = {
            url: "http://openhab:8080/rest/items/" + determineDevice,
            payload: requestPayload
        }
    
        const logMessage = "Sending HTTP GET with body '"+openhabReq.payload+"' to " + openhabReq.url
        httpClient.post(openhabReq.url, openhabReq.payload)
             .then(response => console.log(response))
             .catch(err => console.log(err));
        response.send('Hello from Express! ' + logMessage)
    }

    
})

export default router