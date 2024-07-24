import axios from "axios";
import { getLimelightModel, getParameterYieldModel } from "../utils/initializeModel.js";
import { JSDOM } from 'jsdom'
import { Readability } from "@mozilla/readability";

export const getLimelightResponse = async (prompt) => {
    try {
        const parameterModel = getParameterYieldModel()
        const limelightModel = getLimelightModel()

        let result = await parameterModel.generateContent(prompt);
        let response = await result.response;
        let text = response.text();

        const parameters = JSON.parse(text);

        const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=${parameters.q}&from=${parameters.from}&to=${parameters.to}&pageSize=2&apiKey=${process.env.NEWS_API_KEY}`)

        const fullArticles = await Promise.all(newsResponse.data.articles.map(async article => {
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

        const finalResponse = {
            response: text,
            sourceLinks: newsResponse.data.articles.map(article => article.url),
            image: newsResponse.data.articles[0].urlToImage,
            sourceNames: newsResponse.data.articles.map(article => article.source.name)
        }

        return finalResponse
    } catch (error) {
        console.log(error);
        return {
            response: '',
            sourceLinks: [],
            sourceNames: [],
            image: '',
            error: true
        }
    }
}