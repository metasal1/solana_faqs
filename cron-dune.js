import dotenv from 'dotenv';
import fetch from 'node-fetch';
import schedule from 'node-schedule';

dotenv.config();

const cron = process.argv[2] || process.env.CRON_DUNE_DAU;
console.log(`${import.meta.url} will run every; ${cron}`);

const tweetSchedule = schedule.scheduleJob(import.meta.url, cron, async function () {

    (async () => {
        try {
            const req = await fetch(`https://api.dune.com/api/v1/query/2476143/execute?api_key=${process.env.DUNE_API_KEY}`, {
                method: 'POST',
                headers: {
                    'content-type': "application/json",
                    'accept': "application/json"
                }
            });

            const res = await req.json();
            console.log(res);
        } catch (e) {
            console.dir(e);
        }
    })();
});

const nextJob = schedule.scheduledJobs[Object.keys(schedule.scheduledJobs)[0]];
const nextJobName = nextJob.name;
const nextJobTime = nextJob.nextInvocation().toString();

console.log('Next Job:', nextJobName);
console.log('Next Job Time:', nextJobTime);