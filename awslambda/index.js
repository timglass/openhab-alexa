var https = require('https');

exports.handler = function (request, context) {
    if (request.directive.header.namespace === 'Alexa.Discovery' && request.directive.header.name === 'Discover') {
        log("DEBUG:", "Discover request",  JSON.stringify(request));
        handleDiscovery(request, context, "");
    }
    else if (request.directive.header.namespace === 'Alexa.PowerController') {
        if (request.directive.header.name === 'TurnOn' || request.directive.header.name === 'TurnOff') {
            log("DEBUG:", "TurnOn or TurnOff Request", JSON.stringify(request));
            handlePowerControl(request, context);
        }
    }

    function log(message, message1) {
        console.log(message + ' ' + message1);
    }
    
    

    function handleDiscovery(request, context) {
        var payload = {
            "endpoints":
            [
                {
                    "endpointId": "Kitchen_Light_Dimmer",
                    "manufacturerName": "Fibaro",
                    "friendlyName": "Kitchen Lights",
                    "description": "Kitchen Cabinet LED lights",
                    "displayCategories": ["LIGHT"],
                    /*"cookie": {
                        "key1": "arbitrary key/value pairs for skill to reference this endpoint.",
                        "key2": "There can be multiple entries",
                        "key3": "but they should only be used for reference purposes.",
                        "key4": "This is not a suitable place to maintain current endpoint state."
                    },*/
                    "capabilities":
                    [
                        {
                          "type": "AlexaInterface",
                          "interface": "Alexa",
                          "version": "3"
                        },
                        {
                            "interface": "Alexa.PowerController",
                            "version": "3",
                            "type": "AlexaInterface",
                            "properties": {
                                "supported": [{
                                    "name": "powerState"
                                }],
                                 "retrievable": true
                            }
                        },
                        {
                            "type":"AlexaInterface",
                            "interface":"Alexa.ColorController",
                            "version":"3",
                            "properties":{
                               "supported":[
                                  {
                                     "name":"color"
                                  }
                               ],
                               "retrievable":true
                            }
                         }
                    ]
                }
            ]
        };
        var header = request.directive.header;
        header.name = "Discover.Response";
        log("DEBUG", "Discovery Response: ", JSON.stringify({ header: header, payload: payload }));
        context.succeed({ event: { header: header, payload: payload } });
    }

    function sendRequestHome(device, action, callback) {  
        var body = {
            device: device,  
            amount: action,
          }
          var bodyJson = JSON.stringify(body);

          var options = {
            host: 'home.timglass.co.uk',
            port: 443,
            path: '/alexa/',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Content-Length': bodyJson.length
              //'Authorization': 'Basic ' + new Buffer(process.env.TWILIO_ACCOUNT_SID + ':' + process.env.TWILIO_AUTH_TOKEN).toString('base64')
            }
        }

        var req = https.request(options, function (res) {
            res.setEncoding('utf-8');
            // Collect response data as it comes back.
            var responseString = '';
            res.on('data', function (data) {
              log(data);
            });
            // Or could use JSON.parse(responseString) here to get at individual properties.
            res.on('end', function () {
                log('DEBUG','Response: ' + responseString);
                //completedCallback('API request sent successfully.');
                callback(action, responseString);
            });
        });
        
          // Handler for HTTP request errors.
          req.on('error', function (e) {
            log('DEBUG','HTTP error: ' + e.message);
            //completedCallback('API request completed with error(s).');
          });
          
          
          log('DEBUG','Sending Request Home with body ' + bodyJson);
    
          req.write(bodyJson);
          req.end();
          log('DEBUG','Request Sent');        
    }

    function handlePowerControl(request, context) {
        // get device ID passed in during discovery
        var requestMethod = request.directive.header.name;
        // get user token pass in request
        var requestToken = request.directive.endpoint.scope.token;
        var powerResult;
        var device = request.directive.endpoint;
        if (requestMethod === "TurnOn") {

            // Make the call to your device cloud for control 
            // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
            var actionResult = "ON";
            sendRequestHome(device.endpointId, actionResult,
                function(result, message) { 
                    log(message);
                    sendResponse(result)
                } 
            );
            
        }
       else if (requestMethod === "TurnOff") {
            // Make the call to your device cloud for control and check for success 
            // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
            var actionResult = "OFF";
            sendRequestHome(device.endpointId, actionResult, 
                function( result, message) { 
                    log(message);
                    sendResponse(result)
                } 
            );
        }
        
    }

    function sendResponse(powerResult) {
        var device = request.directive.endpoint;
        var contextResult = {
            "properties": [{
                "namespace": "Alexa.PowerController",
                "name": "powerState",
                "value": powerResult,
                "timeOfSample": new Date().toISOString(),
                "uncertaintyInMilliseconds": 50
            }]
        };
        var responseHeader = request.directive.header;
        responseHeader.namespace = "Alexa";
        responseHeader.name = "Response";
        responseHeader.messageId = responseHeader.messageId + "-R";
        var response = {
            context: contextResult,
            event: {
                header: responseHeader,
                endpoint: device
            },
            payload: {}

        };
        log("DEBUG", "Alexa.PowerController"); // + JSON.stringify(response)
        context.succeed(response);
    }
};
