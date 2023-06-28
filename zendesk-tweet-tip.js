import dotenv from 'dotenv';
import schedule from 'node-schedule';
import tweeter from './zendesk-tweeter.js';
import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const cron = process.argv[2] || process.env.CRON_TWEET_ZENDESKTIPS;
console.log(`${import.meta.url} will run every; ${cron}`);


const tweetSchedule = schedule.scheduleJob(import.meta.url, cron, async function () {

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_ZENDESKTIPS,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "write a tip about zendesk as a tweet\n\n",
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const text = response.data.choices[0].text;

    tweeter(text, 'zendesk');
});

const nextJob = schedule.scheduledJobs[Object.keys(schedule.scheduledJobs)[0]];
const nextJobName = nextJob.name;
const nextJobTime = nextJob.nextInvocation().toString();

console.log('Next Job:', nextJobName);
console.log('Next Job Time:', nextJobTime);