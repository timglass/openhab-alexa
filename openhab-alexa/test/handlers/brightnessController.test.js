import chai from 'chai';
import brightnessRequestHandler from '../../src/alexaHandlers/brightnessController'

const expect = chai.expect;

describe('Brightness Controller', function() {
    it('should return same value given in request amount property', () => {
        const request = { amount: '50' };

        const result = brightnessRequestHandler(request)
        expect(result).to.eql(request.amount); 
    });

    it('should return 100 if request if greater than 100', () => {
        const request = { amount: '110' };

        const result = brightnessRequestHandler(request)
        expect(result).to.eql(100); 
    });

    it('should return 0 if request is less than 0', () => {
        const request = { amount: '-30' };

        const result = brightnessRequestHandler(request)
        expect(result).to.eql(0); 
    });
});