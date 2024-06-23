import axios from 'axios'
import newsData from '../data/daily.json' assert { type: 'json' };
import { JSDOM } from 'jsdom'
import { Readability } from '@mozilla/readability'
import { getNewsModel } from '../utils/initializeModel.js';
import User from '../models/userModel.js';

export const generateDailyNews = async (req, res) => {
    try {
        const { userId, category } = req.body

        const potentialUser = await User.findById(userId)

        // console.log(process.env.NEWS_API_KEY)
        const topHeadlines = await axios.get(`https://newsapi.org/v2/top-headlines?country=${potentialUser.country}&pageSize=5&category=${category}&apiKey=${process.env.NEWS_API_KEY}`)
        console.log(topHeadlines.data.articles)

        // const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${process.env.NEWS_API_KEY}`

        const model = getNewsModel()
        
        const articles = await Promise.all(topHeadlines.data.articles.map(async article => {
            console.log(article.author);
            
            try {
                const response = await axios.get(article.url);
                let dom = new JSDOM(response.data, {
                    url: article.url
                });
                let parsedArticle = new Readability(dom.window.document).parse();
                
                if (parsedArticle && parsedArticle.textContent) {
                    return parsedArticle.textContent;
                } else {
                    console.error(`Failed to parse article at URL: ${article.url}`);
                    return null;
                }
            } catch (error) {
                console.error(`Error fetching or parsing article at URL: ${article.url}`, error);
                return null;
            }
        }));

        // const data = {
        //     length: articles.length,
        //     articles: JSON.stringify(articles)
        // }
        
        const prompt = JSON.stringify(articles)

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        console.log(text);

        const summaries = JSON.parse(text);

        const transformedSummaries = summaries.map((summary, index) => {

            const { source, urlToImage, publishedAt } = topHeadlines.data.articles[index]

            return {
                ...summary,
                source,
                urlToImage,
                publishedAt
            }
        })

        res
            .status(200)
            .json({ transformedSummaries })
            // .send("done")
        
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}