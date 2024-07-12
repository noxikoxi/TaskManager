import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Calendar from "@/lib/models/calendar";
import {Calendar as CalendarType} from "@/lib/types";
import {getSession} from "@auth0/nextjs-auth0";

export const GET = async(req: NextRequest, {params} : {params : {month: number, year: number}}) => {
    try {
        await dbConnect();
        const session = await getSession();

        if (session && session.user) {

            const userId = session.user.sub;
            const month = params.month;
            const year = params.year;

            const existingCalendar = await Calendar.findOne({userId});

            if (!existingCalendar) {
                return new Response("Calendar not found", {status: 404});
            }


            const specificCalendar = existingCalendar.calendars.find((c: CalendarType) => c.month == month && c.year == year);


            if (!specificCalendar) {
                return new Response(JSON.stringify(null), {status: 200})
            }

            return new Response(JSON.stringify(specificCalendar), {status: 200});
        }else{
            return new Response("Unauthorized", {status: 401});
        }
    }catch(error){
        return new Response("Failed to fetch Calendar", {status: 400});
    }


}