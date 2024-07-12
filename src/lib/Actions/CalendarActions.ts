'use server'

import {getSession} from "@auth0/nextjs-auth0";
import {createEventForm} from "@/components/forms/EventForm";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createEvent = async (formData : createEventForm) => {
    const session = await getSession();
    const sessionUser = session?.user;

    if(sessionUser && sessionUser.sub){

        if(formData.time === ""){
            formData.time = "00:00";
        }

        const data = {
            month: formData.date.getUTCMonth(),
            year: formData.date.getUTCFullYear(),
            day: formData.date.getUTCDate(),
            title: formData.title,
            time: formData.time,
            description: formData.description,
            isImportant: formData.isImportant
        }

        const response = await fetch(API_BASE_URL + '/calendar/user/' + sessionUser.sub, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            return false;
        }

        return await response.json();
    }
}

export const deleteEvent = async (year: number, month: number, eventId: string) => {

    const session = await getSession();
    const sessionUser = session?.user;

    if(sessionUser && sessionUser.sub) {

        const response = await fetch(`${API_BASE_URL}/calendar/user/${sessionUser.sub}/${year}/${month}/${eventId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(!response.ok){
            return false;
        }

        return await response.text();
    }

}