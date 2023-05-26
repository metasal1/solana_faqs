import dotenv from 'dotenv';
import schedule from 'node-schedule';
import tweeter from './tweeter.js';
import fetch from 'node-fetch';

dotenv.config();

const cron = process.argv[2] || process.env.CRON_TWEET_PRICE;
console.log(`${import.meta.url} will run every; ${cron}`);

const tweetSchedule = schedule.scheduleJob(import.meta.url, cron, async function () {

    const getSolanaPrice = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
    const solanaPrice = await getSolanaPrice.json();
    const price = solanaPrice.solana.usd;
    const data = `Solana is currently $${price}`;

    tweeter(data);
});

const nextJob = schedule.scheduledJobs[Object.keys(schedule.scheduledJobs)[0]];
const nextJobName = nextJob.name;
const nextJobTime = nextJob.nextInvocation().toString();

console.log('Next Job:', nextJobName);
console.log('Next Job Time:', nextJobTime);