import { GoogleGenerativeAI } from "@google/generative-ai";

export const getNewsModel = () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: `You are a news summarizer. you will respond in the following JSON format only. { "title":string, "summary":"string" }. Your input will be a JSON object with only the article which you will have to summarize.Keep the summary around 30% of the actual article length. Do not respond in any format but the provided JSON.` });

    return model
}
