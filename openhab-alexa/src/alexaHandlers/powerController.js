const powerRequestHandler = (alexaRequest) => {
    if (alexaRequest.amount === "ON" || alexaRequest.amount === "OFF") {
        return alexaRequest.amount;
    }

    return null;
}

export default powerRequestHandler;