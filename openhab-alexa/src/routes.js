import axios from 'axios';
import { log } from 'util';
import generateOpenHabRequestPayload from './alexaHandlers'
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
    let requestPayload = generateOpenHabRequestPayload(alexaRequest);
    //}

    if (requestPayload != null) {
        const openhabReq = {
            url: "http://openhab:8080/rest/items/Kitchen_Light_Dimmer",
            //url: "http://openhab:8080" + "/rest/items/" + alexaRequest.item,
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