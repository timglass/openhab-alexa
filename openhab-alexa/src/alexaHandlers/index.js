import brightnessRequestHandler from './brightnessController'
import colorRequestHandler from './colourController'
import powerRequestHandler from './powerController'

const generateOpenHabRequestPayload = (alexaRequest) => {
    switch (alexaRequest.namespace) {
        case 'BrightnessController':
            return brightnessRequestHandler(alexaRequest);
        case 'PowerController':
            return powerRequestHandler(alexaRequest);
        case 'ColorController':
            return colorRequestHandler(alexaRequest);
    }

}

export default generateOpenHabRequestPayload;