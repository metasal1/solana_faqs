import dotenv from 'dotenv';
import schedule from 'node-schedule';
import findByNull from './findByNull.js';
import update from './updatefaq.js';
import sendTweet from './tweeter.js';
import fetch from 'node-fetch';
// import save from './savetodb.js';

dotenv.config();

const cron = process.argv[2] || process.env.CRON_TWEET_FAQ;
console.log(`${import.meta.url} will run every; ${cron}`);

const tweetSchedule = schedule.scheduleJob(import.meta.url, cron, async function () {

    const faq = await findByNull();
    const tweet = faq.question + " " + faq.answer;
    console.log(tweet);
    const response = await sendTweet(tweet);
    const tweetId = response.data.id;
    console.log(tweetId);
    const updated = await update(faq._id, tweetId);
    console.log(updated);

});

const nextJob = schedule.scheduledJobs[Object.keys(schedule.scheduledJobs)[0]];
const nextJobName = nextJob.name;
const nextJobTime = nextJob.nextInvocation().toString();

console.log('Next Job:', nextJobName);
console.log('Next Job Time:', nextJobTime);