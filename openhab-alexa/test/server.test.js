import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';

const baseUrl = '/alexa';

chai.use(chaiHttp);
const should = chai.should();

describe('Alexa REST endpoint', function() {
    it('should return empty response on GET /', (done) => {
        const expectedResponse = {};

        chai.request(server)
            .get(baseUrl + '/')
            .end((err, res) => {                
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.eql(expectedResponse);
                    done();
            });
        
    });

    it('should accept a request to POST /', (done) => {
        const expectedResponse = {};

        chai.request(server)
            .post(baseUrl + '/')
            .set('content-type', 'application/json')
            .send({ namespace: 'powerRequestHandler', amount: 'ON'})
            .end((err, res) => {                
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    //res.body.should.be.eql(expectedResponse);
                    done();
            });
        
    });
});