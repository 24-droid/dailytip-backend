import axios from "axios"
const fetchDevToArticle=async()=>{
    try {
        const response = await axios.get('https://dev.to/api/articles?top=1')
        const articles=response.data;
        if(!articles.length) return null;
        const randomArticle=articles[Math.floor(Math.random()* articles.length)]
        return {
            title: randomArticle.title,
            description: randomArticle.description,
            url: randomArticle.url,
          };
        
    } catch (error) {
        console.error('Error fetching articles',error)
    }
}