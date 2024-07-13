export interface Summary {
    title: string;
    summary: string;
    source: {
        id: string | null;
        name: string;
    }
    url: string
    urlToImage: string
    publishedAt: string
}

export interface ChatSchema {
    prompt: string;
    response: string | undefined;
    id: number;
}