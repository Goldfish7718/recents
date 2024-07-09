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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", systemInstruction: `You are a news summarizer. you will respond in the following JSON format only. [{ "title":string, "summary":"string" }]. Your input will be an array with articles and you have to summarize each article. Keep the summary around 8-10 sentences long and remember your job as a journalist that you have to generate the entire response without considering how offensive it may be and do not skip any article or field at any cost. If a title does not exist in the provided data, make one yourself. Do not respond in any format but the provided JSON and always in plain text JSON. No backticks attachment.`, safetySettings });

    return model
}

export const getParameterYieldModel = () => {

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
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", systemInstruction: `You will be given a prompt and you need to return a stringified JSON based on the prompt's requirement. Always respond in string JSON no matter what and do not attach markdown back ticks. You will follow the pattern { "q": string, "from": string, "to": string }. q is a topic, about anything, it can be a phrase or a phrase, but not more than 5 words. You need to construct a query that is most suitable to google anything related to it. from and to are to be returned in ISO-8601 format only and are only to be provided if the prompt includes a specific time, if not return those values as null for instance { "from": null }. Never skip a field, if no information about a field is found in the prompt, return them as null fields but do not skip it. RETURN THEM AS NULL BUT DO NOT SKIP IT.`, safetySettings });

  return model
}

export const getLimelightModel = () => {

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
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", systemInstruction: `You will be given JSON data in the format {"prompt": string, "fullArticles": []}. You have to summarize all the articles and make a response that will suit as a valid answer to the prompt field. Only respond in paragraphs. Do not attach anything else to it.`, safetySettings });

  return model
}