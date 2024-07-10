'use server'

import {getSession} from "@auth0/nextjs-auth0";
import {Car} from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createCar = async (car : Omit<Car, "_id" | "userId">) => {
    const session = await getSession();
    const sessionUser = session?.user;

    if(sessionUser && sessionUser.sub){
        const response = await fetch(API_BASE_URL + '/cars/user/' + sessionUser.sub, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(car)
        })

        if(!response.ok){
            return false;
        }

        return await response.json();
    }
}

export const deleteCar = async (carId: string) => {
    const response = await fetch(API_BASE_URL + '/cars/' + carId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })

    return response.ok;
}

export const updateCar = async (car : Car) => {

    const response = await fetch(API_BASE_URL + '/cars/' + car._id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(car)
    })

    if(!response.ok){
        return false;
    }

    return await response.json();
}

export const getCars = async () => {
    const session = await getSession();
    const sessionUser = session?.user;

    if(sessionUser && sessionUser.sub) {
        const response = await fetch(API_BASE_URL + '/cars/user/' + sessionUser.sub, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(!response.ok){
            return false;
        }

        return await response.json();
    }

}

