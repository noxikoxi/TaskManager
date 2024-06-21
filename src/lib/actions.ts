'use server'

import {getSession} from "@auth0/nextjs-auth0";
import {User} from "@/lib/types";
import {unstable_noStore as noStore} from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createUser = async () => {
    const session = await getSession();
    const sessionUser = session?.user;
    if (sessionUser) {
        const user: User = {
            email: sessionUser.email,
            id: sessionUser.sub,
            username: sessionUser.nickname,
            picture: sessionUser.picture
        }
        const response = await fetch(API_BASE_URL + '/create-user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })

        if(!response.ok){
            return false;
        }

        return response.status == 201 || response.status == 200;
    }
}

export const getTodos = async() => {
    noStore();
    const session = await getSession();

    if(!session || !session.user){
        return [];
    }
    const response = await fetch(API_BASE_URL + '/todos/user/' + session.user.sub, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `${session.idToken}`
        },
    })


    if(!response.ok){
        return [];
    }

    if(response.status != 200){
        return [];
    }else{
        return await response.json();
    }
}

export const getTodo = async (id: string) => {
    noStore();

    const response = await fetch(API_BASE_URL + '/todos/' + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if(!response.ok){
        return [];
    }

    if(response.status != 200){
        return [];
    }else{
        return await response.json();
    }
}

export const deleteTodo = async(id: string) => {
    const response = await fetch(API_BASE_URL + '/todos/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if(!response.ok){
        return false;
    }

    return response.status == 200;
}

export const addTodoItem = async(todoId: string, content: string) => {
    const response = await fetch(API_BASE_URL + '/todos/' + todoId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({content})
    })

    if(!response.ok){
        return false;
    }

    return await response.json();
}

export const addTodoItemSubpoint = async(todoId: string, itemId: string, content: string) => {
    const response = await fetch(API_BASE_URL + '/todos/' + todoId + '/' + itemId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({content})
    })

    if(!response.ok){
        return false;
    }

    return await response.json();
}

export const deleteTodoItem = async(todoId: string, itemId: string) => {
    const response = await fetch(API_BASE_URL + '/todos/' + todoId + '/' + itemId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if(!response.ok){
        return false;
    }

    return response.status == 200;
}

export const updateTodoItem = async(todoId: string, itemId: string, isImportant: boolean, isDone: boolean) => {
    const response = await fetch(API_BASE_URL + '/todos/' + todoId + '/' + itemId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({isImportant, isDone })
    })

    if(!response.ok){
        return false;
    }

    return await response.json();
}

export const updateTodoPoint = async(todoId: string, itemId: string, pointId: string, isImportant: boolean, isDone: boolean) => {
    const response = await fetch(API_BASE_URL + '/todos/' + todoId + '/' + itemId + '/' + pointId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({isImportant, isDone })
    })

    if(!response.ok){
        return false;
    }

    return await response.json();
}

export const deleteTodoPoint = async(todoId: string, itemId: string, pointId: string) => {
    const response = await fetch(API_BASE_URL + '/todos/' + todoId + '/' + itemId + '/' + pointId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if(!response.ok){
        return false;
    }

    return response.status == 200;
}

