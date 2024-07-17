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

export interface LimelightResponse {
    response: string;
    sourceLinks: string[];
    sourceNames: string[];
    image: string;
    error: boolean;
}
