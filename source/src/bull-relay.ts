
import * as dotenv  from 'dotenv';
import * as chalk   from 'chalk';
import * as Queue   from 'bull';
import * as Promise from 'bluebird'
import * as _       from 'lodash';

// pull in the .env
require('dotenv').config();

export class BullRelay
{
    _queue = new Queue (

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

    constructor ( )
    {

    }

    public enqueue ( obj :  any )
    {
        this._queue.add ( obj );
    }

}
