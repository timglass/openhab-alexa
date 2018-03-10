const colourRequestHandler = (alexaRequest) => {
    const {hue, saturation, brightness} = alexaRequest.amount;

    const adjustedSaturation = saturation * 100;
    const adjustedBrightness = brightness * 100;
    
    if (!!hue || hue === 0) {
        return hue + "," + adjustedSaturation + ',' + adjustedBrightness;
    }

    return null;
}

export default colourRequestHandler;