import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { getNewsModel } from "../utils/initializeModel.js";
import User from "../models/userModel.js";

export const generateDailyNews = async (req, res) => {
  try {
    const { category, q, country, clerkId } = req.body;
    let topHeadlines;

    if (!q)
      topHeadlines = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=5&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
      );
    else
      topHeadlines = await axios.get(
        `https://newsapi.org/v2/top-headlines?q=${q}&country=${country}&pageSize=5&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
      );

    await User.findOneAndUpdate(
      { clerkId },
      { $inc: { dailySummariesRequests: 1 } }
    );

    const model = getNewsModel();

    const articles = await Promise.all(
      topHeadlines.data.articles.map(async (article) => {
        try {
          const response = await axios.get(article.url);
          let dom = new JSDOM(response.data, {
            url: article.url,
          });
          let parsedArticle = new Readability(dom.window.document).parse();

          if (parsedArticle && parsedArticle.textContent) {
            return parsedArticle.textContent;
          } else {
            console.error(`Failed to parse article at URL: ${article.url}`);
            return null;
          }
        } catch (error) {
          console.error(
            `Error fetching or parsing article at URL: ${article.url}`,
            error
          );
          return null;
        }
      })
    );

    const prompt = JSON.stringify(articles);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const summaries = JSON.parse(text);

    const transformedSummaries = summaries.map((summary, index) => {
      const { source, urlToImage, publishedAt, url } =
        topHeadlines.data.articles[index];

      return {
        ...summary,
        source,
        url,
        urlToImage,
        publishedAt,
      };
    });

    res.status(200).json({ transformedSummaries });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLimelightResponse = async (req, res) => {
  const { prompt, clerkId } = req.body;

  try {
    const parameterModel = getParameterYieldModel();
    const limelightModel = getLimelightModel();

    // Step 1: Understand prompt
    const result = await parameterModel.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const parameters = JSON.parse(text);

    // Step 2: Fetch articles
    const newsResponse = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: parameters.q,
        from: parameters.from,
        to: parameters.to,
        pageSize: 2,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const fullArticles = await Promise.all(
      newsResponse.data.articles.map(async (article) => {
        try {
          const response = await axios.get(article.url);
          const dom = new JSDOM(response.data, { url: article.url });
          const parsedArticle = new Readability(dom.window.document).parse();
          return parsedArticle?.textContent || null;
        } catch (err) {
          console.error(`Failed to parse article at URL: ${article.url}`);
          return null;
        }
      })
    );

    // Step 3: Summarize
    const limelightPrompt = {
      prompt: parameters.q,
      fullArticles: JSON.stringify(fullArticles),
    };

    const summaryResult = await limelightModel.generateContent(
      JSON.stringify(limelightPrompt)
    );
    const summaryResponse = await summaryResult.response;
    const finalText = await summaryResponse.text();

    // Step 4: Track usage
    await User.findOneAndUpdate(
      { clerkId },
      { $inc: { limelightRequests: 1 } }
    );

    const finalResponse = {
      response: finalText,
      sourceLinks: newsResponse.data.articles.map((article) => article.url),
      image: newsResponse.data.articles[0]?.urlToImage || "",
      sourceNames: newsResponse.data.articles.map(
        (article) => article.source.name
      ),
    };

    return res.status(200).json(finalResponse);
  } catch (error) {
    console.error("Error in getLimelightResponse:", error);
    return res.status(500).json({
      response: "",
      sourceLinks: [],
      sourceNames: [],
      image: "",
      error: true,
    });
  }
};
