const brightnessRequestHandler = (alexaRequest) => {
    var dimmerPercentage = 0;
    
    if (alexaRequest.amount < 0) {
        dimmerPercentage = 0;
    } else if (alexaRequest.amount > 100) {
        dimmerPercentage = 100;
    } else {
        dimmerPercentage = alexaRequest.amount;
    }
    
    return dimmerPercentage.toString();
}

export default brightnessRequestHandler;