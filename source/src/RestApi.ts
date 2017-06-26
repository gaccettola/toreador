
import * as dotenv      from 'dotenv';
import * as express     from 'express';
import * as logger      from 'morgan';
import * as bodyParser  from 'body-parser';
import { BullRelay }    from './bull-relay';

// pull in the .env
require('dotenv').config();

// Creates and configures an ExpressJS web server.
export class RestApi
{
    // ref to Express instance
    private _express    : express.Application;

    // the bull connection for writing
    private _bullRelay  : BullRelay;

    //Run configuration methods on the Express instance.
    constructor ( )
    {
        this._express = express();

        this.middleware();
        this.routes();

        this._bullRelay = new BullRelay ( );
    }

    // Configure Express middleware.
    private middleware ( ) : void
    {
        this._express.use ( logger ( 'dev' ) );

        this._express.use ( bodyParser.json() );

        this._express.use ( bodyParser.urlencoded ( { extended: false } ) );
    }

    // Configure API endpoints.
    private routes ( ) : void
    {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();

        // placeholder route handler
        router.get ( '/', ( req, res ) =>
        {
            let response_object =
            {
                message : 'Hello World!'
            };

            res.json ( response_object );

            this._bullRelay.enqueue ( response_object );

        } );

        this._express.use ( '/', router );
    }

    getexpress ()
    {
        return this._express;
    }

}