import cron from "node-cron"
import sendEmail from "./sendEmail.js"
import fetchDevToArticle from "./fetchDevToArticle.js"
import {User} from "../models/user.model.js"
const sendDailyArticles =async()=>{
    try {
        const article = await fetchDevToArticle();
        if(!article) return console.log("No article found")
            const users=await User.find({},"email");
        if(!users.length) return console.log("No users found")
            const emailPromises=users.map((user)=>{
        sendEmail({
            to:user.email,
            subject:"Daily Article",
            text:`${article.title}\n${article.description}\n${article.url}`,
            html:`<h1>${article.title}</h1><p>${article.description}</p><a href="${article.url}">Read More</a>`,
        })})
        await Promise.all(emailPromises);
        console.log("Daily articles sent to all users!")

    } catch (error) {
        console.error("Failed to send article",error);
    }
};
cron.schedule("0 9 * * *",()=>{
    console.log("Running daily article cron job...")
    sendDailyArticles();
})
export default sendDailyArticles;