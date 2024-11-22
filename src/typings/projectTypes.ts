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
    creator: { name: string };
}

export interface User {
    id: string;
    name: string;
    email: string;
    userName: string;
    active: boolean;
    type: UserType;
    articles: Article[];
    password?: string;
}
export type UserType = 'ADMIN' | 'TEACHER' | 'STUDENT';
