'use server'

import {getSession} from "@auth0/nextjs-auth0";
import {Dashboard, dashboardForm, Note, noteForm, User} from "@/lib/types";


export const createUser = async () => {
    const session = await getSession();
    const sessionUser = session?.user;
    if (sessionUser) {
        const user: User = {
            email: sessionUser.email,
            id: sessionUser.sub,
            name: sessionUser.nickname
        }
        const response = await fetch('http://localhost:3000/api/db/user', {
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

export const createDashboard = async (formData: dashboardForm) => {
    const session = await getSession();
    const sessionUser = session?.user;
    if (sessionUser) {
        const dashboard: Dashboard = {
            createdAt: new Date(),
            name: formData.name,
            description: formData.description,
            userId: sessionUser.sub,
            notes: []
        };
        const response = await fetch('http://localhost:3000/api/db/dashboard', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dashboard)
        })

        if(!response.ok){
            throw new Error();
        }

        return await response.json();

    }
}

export const getDashboards = async (userId: string | null | undefined) => {
    if(!userId){
        return null;
    }
    const response = await fetch("http://localhost:3000/api/db/dashboard/" + userId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(!response.ok){
        throw new Error();
    }

    return response.json();

}

export const fetchDashboard = async(id: string) => {
    const response = await fetch("http://localhost:3000/api/db/dashboard/one/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(!response.ok){
        throw new Error();
    }

    return await response.json();
}

export const updateDashboard = async(
    {name, description, id, noteTitle, noteContent, noteId} : {
        name?: string,
        description?: string,
        id: string,
        noteTitle?: string,
        noteContent? : string
        noteId? : string
    }
) => {

    let data = {
        name,
        description
    }

    if(noteId){
        data = Object.assign(data, {
            note : {
                title: noteTitle,
                content: noteContent,
                _id: noteId
            }
        })
    }

    const response = await fetch("http://localhost:3000/api/db/dashboard/one/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if(!response.ok){
        throw new Error("Failed to update Dashboard");
    }

    return await response.json();

}

export const deleteDashboard = async(id: string) => {
    const response = await fetch("http://localhost:3000/api/db/dashboard/one/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(!response.ok){
        throw new Error();
    }

    return response.status == 200;
}

export const deleteNote = async({dashboardId, noteId}: {dashboardId: string, noteId: string}) => {
    const response = await fetch("http://localhost:3000/api/db/dashboard/one/" + dashboardId + "/" + noteId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if(!response.ok){
        throw new Error();
    }

    return response.status == 200;
}

