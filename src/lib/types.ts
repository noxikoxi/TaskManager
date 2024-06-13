export type User = {
    username: string,
    email: string,
    id: string,
    picture?: string,
    firstName? :string,
    lastName?: string,
    aboutMe?: string,
    company?: string,
    city? : string,
    country? : string
}

export type Note = {
    _id: string,
    title: string,
    content: string,
    createdAt: Date,
}

export type Dashboard = {
    _id?: string,
    name: string,
    description?: string,
    userId: string,
    createdAt: Date
    notes: [] | Note[],
}

export type dashboardForm = {
    name: string,
    description? : string
}

export type noteForm = {
    title: string,
    content : string
}

export type UpdateUserRequest = {
    username: string;
    company: string;
    city: string;
    country: string;
    aboutMe :string;
    firstName : string;
    lastName : string;
}