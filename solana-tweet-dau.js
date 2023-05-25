import dotenv from 'dotenv';
import schedule from 'node-schedule';
import sendTweet from './tweeter.js';
import fetch from 'node-fetch';

dotenv.config();

const cron = process.argv[2] || process.env.CRON_TWEET_DAU;
console.log(`${import.meta.url} will run every; ${cron}`);

const tweetSchedule = schedule.scheduleJob(import.meta.url, cron, async function () {

    const url = `https://api.solana.fm/v0/stats/active-users`;
    const req = await fetch(url)
    const res = await req.json();
    const dau = res.result.activeUsers.toLocaleString();
    console.log("DAU", dau);
    const data = `Did you know that yesterday, the number of users on Solana reached a staggering ${dau}? 🙆‍♂️`

    sendTweet(data);
});

const nextJob = schedule.scheduledJobs[Object.keys(schedule.scheduledJobs)[0]];
const nextJobName = nextJob.name;
const nextJobTime = nextJob.nextInvocation().toString();

console.log('Next Job:', nextJobName);
console.log('Next Job Time:', nextJobTime);