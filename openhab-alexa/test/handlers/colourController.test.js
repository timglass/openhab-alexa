import chai from 'chai';
import colourRequestHandler from '../../src/alexaHandlers/colourController'

const expect = chai.expect;

describe('Colour Controller', function() {
    it('should return openhab format of HSB for when given Alexa red HSB', () => {
        const request = { amount: { hue: 0, saturation: 1, brightness: 1 } };

        const result = colourRequestHandler(request)
        expect(result).to.eql('0,100,100'); 
    });

    

    it('using Alexa sample should return double typed values for saturation and brightness', () => {
        const request = { 
            "amount": {
                "hue": 350.5,
                "saturation": 0.7138,
                "brightness": 0.6524
            }
        }

        const result = colourRequestHandler(request);
        expect(result).to.eql('350.5,71.38,65.24'); 
    });

});