'use server'

import {getAccessToken, getSession} from "@auth0/nextjs-auth0";
import {Dashboard, dashboardForm, UpdateUserRequest, User} from "@/lib/types";

const API_BASE_URL = process.env.API_BASE_URL;

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
        const response = await fetch(API_BASE_URL + '/user', {
            method: "Post",
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

