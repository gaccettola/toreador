import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { RestApi    }   from '../src/RestApi';

let _restApi;
let _app;

chai.use ( chaiHttp );
const expect = chai.expect;

describe ( 'baseRoute', ( ) =>
{
    before ( ( done ) =>
    {
        _restApi    = new RestApi ( );
        _app        = _restApi.getexpress ( );

        done ( );

    } );

    it ( 'should be json', ( ) =>
    {
        return chai.request ( _app ).get ( '/' )
            .then( res =>
            {
                expect(res.type).to.eql('application/json');
            } );
    } );

    it ( 'should have a message prop', ( ) =>
    {
        return chai.request ( _app ).get ( '/' )
            .then ( res =>
            {
                expect ( res.body.message ).to.eql ( 'Hello World!' );
            } );
    } );

} );