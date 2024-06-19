'use server'

import {getSession} from "@auth0/nextjs-auth0";
import {User} from "@/lib/types";

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
    const response = await fetch(API_BASE_URL + '/db/todos', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if(!response.ok){
        return false;
    }

    console.log(response);

    if(response.status != 200){
        return []
    }else{
        return await response.json();
    }
}

