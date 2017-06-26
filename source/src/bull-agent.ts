
import * as dotenv  from 'dotenv';
import * as chalk   from 'chalk';
import * as Queue   from 'bull';
import * as Promise from 'bluebird'
import * as _       from 'lodash';

// pull in the .env
require('dotenv').config();

export class BullAgent
{
    _queue: any;

    constructor ( )
    {
        this._queue = new Queue (

            process.env.BULL_QUEUE_SET_ONE,
            {
                redis :
                {
                    port        : process.env.REDIS_SERVER_PORT,   // Redis port
                    host        : process.env.REDIS_SERVER_HOST,   // Redis host
                    family      : process.env.REDIS_SERVER_FAMILY, // 4 (IPv4) or 6 (IPv6)
                    password    : process.env.REDIS_SERVER_AUTH,
                    db          : process.env.REDIS_SERVER_DATA,
                }
            }

        );

        this._queue.process ( ( job : any, done ) =>
        {
            this.ping ( _.random ( 5, 25, true ), done );

        } );

        this._queue.on ( 'completed', ( job, result ) =>
        {
            console.log ( chalk.yellow ( `completed : ${job.data.message}` ) );

        } );

    }

    ping = Promise.coroutine ( function* ( val, done )
    {
        console.log ( `Ping? ${val} `);

        yield this.someAsyncTask ( val );

        yield this.someAsyncTask ( val );

        yield this.someAsyncTask ( val );

        done ( );

    } );

    someAsyncTask ( delay )
    {
        return new Promise ( ( resolve ) =>
        {
            setTimeout( ( ) =>
            {
                resolve ( delay );

            }, delay );

        } );
    }

}
