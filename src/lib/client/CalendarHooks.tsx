'use client'

import {useQuery} from "react-query";
import {toast} from "sonner";
import {getSession} from "@auth0/nextjs-auth0";
import {Calendar} from "@/lib/types";
import {useUser} from "@auth0/nextjs-auth0/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export const getCalendar = async (month : number, year: number) => {
//     const session = await getSession();
//     const sessionUser = session?.user;
//
//     if(sessionUser && sessionUser.sub) {
//         const response = await fetch(API_BASE_URL + '/calendar/user/' + sessionUser.sub + "/" + String(year) + "/" + String(month) , {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//
//         if(!response.ok){
//             return false;
//         }
//
//         return await response.json();
//     }
// }

export const useGetCalendar = (month : number, year: number) => {
    const createGetCalendarRequest = async (month : number, year: number) : Promise<Calendar> => {

            const response = await fetch(API_BASE_URL + '/calendar/' + String(year) + "/" + String(month) , {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error();
            }

            return response.json();

    }

    const {data : calendar, isLoading, error} = useQuery(
        ["fetchCalendar", month, year],
        () => createGetCalendarRequest(month, year)
    );

    if(error){
        toast.error("Something went wrong, please try again: ");
    }

    return {
        calendar,
        isLoading,
        error
    }
}