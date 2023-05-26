import dotenv from 'dotenv';
import schedule from 'node-schedule';
import tweeter from './tweeter.js';
import fetch from 'node-fetch';

dotenv.config();

const cron = process.argv[2] || process.env.CRON_TWEET_TRANSACTIONS;
console.log(`${import.meta.url} will run every; ${cron}`);

const tweetSchedule = schedule.scheduleJob(import.meta.url, cron, async function () {

    const req = await fetch(`https://api.dune.com/api/v1/query/2476143/results?api_key=${process.env.DUNE_API_KEY}`)
    const res = await req.json();
    console.log(res);
    const tx = res.result.rows[0]._col0;
    console.log("Transactions", tx);
    const data = `Did you know the Solana Blockchain performed ${tx.toLocaleString()} transactions in the past hour ? 🤯 That's ${Math.round(tx / 60).toLocaleString()} per minute!`

    tweeter(data);
});

const nextJob = schedule.scheduledJobs[Object.keys(schedule.scheduledJobs)[0]];
const nextJobName = nextJob.name;
const nextJobTime = nextJob.nextInvocation().toString();

console.log('Next Job:', nextJobName);
console.log('Next Job Time:', nextJobTime);