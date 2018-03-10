const deviceDatabase = {
    Kitchen_Light_Dimmer: {
        PowerController: 'Kitchen_Light_Dimmer',
        BrightnessController: 'Kitchen_Light_Dimmer',
        ColorController: 'ZWaveNode3_ColorColor',
    }
}

const deviceLookup = (endpointId, controller) => {
    const deviceCapabilities = deviceDatabase[endpointId];

    if (!!deviceCapabilities) {
        return !!deviceCapabilities[controller] ? deviceCapabilities[controller] : null;
    }

    return null;    
}

export default deviceLookup