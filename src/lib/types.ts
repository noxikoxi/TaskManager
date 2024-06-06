export type AuthError = {
    status?: number;
    message: string;
}

export type User = {
    name: string,
    email: string,
    id: string,
    picture?: string,
}