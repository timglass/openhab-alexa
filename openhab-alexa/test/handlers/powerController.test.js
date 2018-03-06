import chai from 'chai';
import powerRequestHandler from '../../src/alexaHandlers/powerController'

const expect = chai.expect;

describe('Power Controller', function() {
    it('should return ON when request is ON', () => {
        const request = { amount: 'ON' };

        const result = powerRequestHandler(request)
        expect(result).to.eql('ON'); 
    });

    it('should return OFF when request is OFF', () => {
        const request = { amount: 'OFF' };

        const result = powerRequestHandler(request)
        expect(result).to.eql('OFF'); 
    });

    it('should return null when request is neither ON or OFF', () => {
        const request = { amount: 'TEST' };

        const result = powerRequestHandler(request)
        expect(result).to.eql(null); 
    });
});