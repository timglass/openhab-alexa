import brightnessRequestHandler from './brightnessController'
import colorRequestHandler from './colorController'
import powerRequestHandler from './powerController'

const generateOpenHabRequestPayload = (alexaRequest) => {
    const {namespace, value} = alexaRequest;
    //console.log('Namespace - ' + namespace)
    switch (namespace) {
        case 'brightnessRequestHandler':
            return brightnessRequestHandler(alexaRequest);
        case 'powerRequestHandler':
            return powerRequestHandler(alexaRequest);
        case 'colorRequestHandler':
            return colorRequestHandler(alexaRequest);
    }

}

export default generateOpenHabRequestPayload;