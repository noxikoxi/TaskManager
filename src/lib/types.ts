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

export type Notebook = {
    _id: string,
    name: string,
    description?: string,
    userId: string,
    createdAt: Date
    notes: [] | Note[],
}

export type NotebookForm = {
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

export type TodoItem = {
    _id: string,
    points: [
        {
            _id: string,
            content: string,
            isDone: boolean,
            isImportant: boolean
        }
    ]
    content: string,
    isDone: boolean,
    isImportant: boolean
}

export type Todo = {
    _id: string,
    name: string,
    description: string,
    createdAt: Date,
    items: TodoItem[],
}

export type Car = {
    _id: string,
    brand: string,
    model: string,
    registration: string,
    insuranceTo: Date,
    inspectionTo: Date,
    userId: string,
    description?: string
    productionYear?: string,
    insurancePrice?: string
}