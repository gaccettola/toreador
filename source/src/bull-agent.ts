
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
                    port        : process.env.REDIS_SERVER_PORT,
                    host        : process.env.REDIS_SERVER_HOST,
                    family      : process.env.REDIS_SERVER_FAMILY,
                    password    : process.env.REDIS_SERVER_AUTH,
                    db          : process.env.REDIS_SERVER_DATA,
                }
            }

        );

        // when a task has been delivered for processing
        this._queue.process ( ( job : any, done ) =>
        {
            // into the task processor
            this.process_task ( _.random ( 5, 25, true ), done );

        } );

        // when the process has been processed
        this._queue.on ( 'completed', ( job, result ) =>
        {
            console.log ( chalk.yellow ( `completed : ${JSON.stringify(job.data)}` ) );

        } );

    }

    // coroutine wrapped series of promise
    process_task = Promise.coroutine ( function* (val, done )
    {
        yield this.process_step_n ( val );

        yield this.process_step_n ( val );

        yield this.process_step_n ( val );

        done ( );

    } );

    // arbitrary process step for testing
    process_step_n ( delay )
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
