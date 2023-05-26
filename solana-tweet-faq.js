import dotenv from 'dotenv';
import schedule from 'node-schedule';
import findByNull from './findByNull.js';
import update from './updatefaq.js';
import tweeter from './tweeter.js';
import fetch from 'node-fetch';
// import save from './savetodb.js';

dotenv.config();

const cron = process.argv[2] || process.env.CRON_TWEET_FAQ;
console.log(`${import.meta.url} will run every; ${cron}`);

const tweetSchedule = schedule.scheduleJob(import.meta.url, cron, async () => {

    const faq = await findByNull();
    const tweet = faq.question + "\n\n" + faq.answer;
    const req = await tweeter(tweet);
    if (req.status === 200) {
        const tweetId = await req.data.id;
        console.log(tweetId);
        const updated = await update(faq._id, tweetId);
        console.log(updated);
    }
});

const nextJob = schedule.scheduledJobs[Object.keys(schedule.scheduledJobs)[0]];
const nextJobName = nextJob.name;
const nextJobTime = nextJob.nextInvocation().toString();

console.log('Next Job:', nextJobName);
console.log('Next Job Time:', nextJobTime);