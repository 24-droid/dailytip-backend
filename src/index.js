import dotenv from "dotenv"
import connectDB from "./db/index.js";
import sendDailyArticles from "./utils/cronJob.js";
import app from "./app.js";
dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server running on ${process.env.PORT}`)
    })
    app.on("error",(error)=>{
        console.log(error)
    })
})
.catch((error)=>{
 console.log("MONGODB CONNECTION FAILED:",error)
})
setInterval(() => {
    const now = new Date();
    const hours = now.getHours();  
    const minutes = now.getMinutes();
    
    if (hours === 20 && minutes === 0) {
      sendDailyArticles();
    }
  }, 60000);