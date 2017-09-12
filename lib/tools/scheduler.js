/**
 * This module assists in scheduling tasks that run less often than every second.
 * Scheduled jobs will be executed within +/- 500ms of their scheduled time.
 * Tasks that are missed due to servers sleeping or similar events will run as soon as the scheduler is woken up.
 * Tasks cannot take parameters and should be idempotent: ie, if run multiple times, they will have the same effect as if run once.
 * Additionally tasks should account for the fact they may not be run at all, and therefore should catch up any missed runs when run.
 * Consider using generators for this purpose.
 */

const TICK_LENGTH = 500; // interval in MS in which event loop should run
const MAX_LOG_LENGTH = 10;

const utils = {
    get now() {
        return new Date().getTime();
    },
};

class Jobs {
    constructor() {
        this.list = [];
        // Start the event loop
        setInterval(this.executeJobs.bind(this), TICK_LENGTH);
    }

    schedule(job) {
        this.list.push(job);
    }

    clear() {
        this.list = [];
    }

    executeJobs() {
        this.list.map((job) => {
            if (job.shouldRun) {
                job.execute();
            }
        });
    }
}

class Job {
    constructor(task, interval) {
        // const interval = {
        //     every: 2,
        //     unit: 'days',
        //     gmtOffset: -7
        // }

        const conversionTable = {
            'seconds': 1000,
            'minutes': 60 * 1000,
            'hours': 60 * 60 * 1000,
            'days': 24 * 60 * 60 * 1000,
        };

        if (!conversionTable[interval.unit]) {
            throw new Error('illegal interval.unit specified: seconds, minutes, hours, days are supported');
        }

        this.task = task;
        this.interval = conversionTable[interval.unit] * interval.every; // in ms
        this.gmtOffset = (interval.gmtOffset || 0) * conversionTable.hours;
        this.runLog = [];
    }

    get shouldRun() {
        // run on startup
        if (0 === this.runLog.length) {
            return true;
        }

        // Run at next scheduled interval according to anchor
        const lastRun = this.runLog[this.runLog.length - 1];
        if (
            lastRun + this.interval <= utils.now || // we're late running the job
            (utils.now - this.gmtOffset) % this.interval < TICK_LENGTH // some integer multiple of the expected run time has been achieved
        ) {
            return true;
        }

        return false;
    }

    execute() {
        // log the run
        this.runLog.push(utils.now);

        // run the task
        this.task();

        if (this.runLog.length > MAX_LOG_LENGTH) {
            this.runLog.shift();
        }
    }
}

const jobs = new Jobs();

module.exports = {};
module.exports.Job = Job;
module.exports.schedule = jobs.schedule.bind(jobs);
module.exports.clear = jobs.clear.bind(jobs);
