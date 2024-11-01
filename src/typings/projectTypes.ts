export interface JwtPayload {
    exp: number;
}
export interface Article {
    active: boolean;
    content: string;
    creator_id: string;
    date: string;
    file: any;
    filePath: string | null;
    id: string;
    title: string;
}
