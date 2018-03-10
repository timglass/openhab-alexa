import chai from 'chai';
import deviceLookup from '../src/deviceDatabase'

const expect = chai.expect;

describe('Device Database', function() {
    it('should return Kitchen Light Dimmer for power request', () => {
        const result = deviceLookup('Kitchen_Light_Dimmer', 'PowerController')
        expect(result).to.eql('Kitchen_Light_Dimmer'); 
    });

    it('should return ZWave Node 3 colour for colour request', () => {
        const result = deviceLookup('Kitchen_Light_Dimmer', 'ColorController')
        expect(result).to.eql('ZWaveNode3_ColorColor'); 
    });

    it('should return null for correct device but bad namespace request', () => {
        const result = deviceLookup('Kitchen_Light_Dimmer', 'BadController')
        expect(result).to.eql(null); 
    });

    it('should return null for unknown device', () => {
        const result = deviceLookup('Dummy_Device_Identifier', '')
        expect(result).to.eql(null); 
    });

});