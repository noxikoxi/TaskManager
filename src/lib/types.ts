export type User = {
    name: string,
    email: string,
    id: string,
    picture?: string,
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