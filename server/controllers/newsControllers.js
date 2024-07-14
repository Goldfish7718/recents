import axios from 'axios'
import { JSDOM } from 'jsdom'
import { Readability } from '@mozilla/readability'
import { getLimelightModel, getNewsModel, getParameterYieldModel } from '../utils/initializeModel.js';

export const generateDailyNews = async (req, res) => {
    try {
        const { category, q, country } = req.body
        let topHeadlines

        if (!q)
            topHeadlines = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=5&category=${category}&apiKey=${process.env.NEWS_API_KEY}`)
        else
            topHeadlines = await axios.get(`https://newsapi.org/v2/top-headlines?q=${q}&country=${country}&pageSize=5&category=${category}&apiKey=${process.env.NEWS_API_KEY}`)

        const model = getNewsModel()
        
        const articles = await Promise.all(topHeadlines.data.articles.map(async article => {
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
        
        const prompt = JSON.stringify(articles)

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const summaries = JSON.parse(text);

        const transformedSummaries = summaries.map((summary, index) => {

            const { source, urlToImage, publishedAt, url } = topHeadlines.data.articles[index]

            return {
                ...summary,
                source,
                url,
                urlToImage,
                publishedAt
            }
        })

        res
            .status(200)
            .json({ transformedSummaries })
        
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const getLimelightResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        const parameterModel = getParameterYieldModel()
        const limelightModel = getLimelightModel()

        let result = await parameterModel.generateContent(prompt);
        let response = await result.response;
        let text = response.text();

        const parameters = JSON.parse(text);

        const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=${parameters.q}&from=${parameters.from}&to=${parameters.to}&pageSize=2&apiKey=${process.env.NEWS_API_KEY}`)
        const { data: articles } = newsResponse

        const fullArticles = await Promise.all(articles.articles.map(async article => {
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
        }));

        const limelightPrompt = {
            prompt: parameters.q,
            fullArticles: JSON.stringify(fullArticles)
        }

        result = await limelightModel.generateContent(JSON.stringify(limelightPrompt));
        response = await result.response;
        text = response.text();
        
        res
            .status(200)
            .json({ response: text })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}