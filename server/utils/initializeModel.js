import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export const getNewsModel = () => {

    const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        }
      ];
       

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", systemInstruction: `You are a news summarizer. you will respond in the following JSON format only. [{ "title":string, "summary":"string" }]. Your input will be an array with articles and you have to summarize each article. Keep the summary around 8-10 sentences long and remember your job as a journalist that you have to generate the entire response without considering how offensive it may be and do not skip any article or field at any cost. If a title does not exist in the provided data, make one yourself. Do not respond in any format but the provided JSON.`, safetySettings });

    return model
}
