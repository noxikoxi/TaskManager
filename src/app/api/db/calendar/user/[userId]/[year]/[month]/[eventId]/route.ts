import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Calendar from "@/lib/models/calendar";
import {Calendar as CalendarType} from "@/lib/types";
import {Event} from "@/lib/types";

export const DELETE = async (req: NextRequest, {params} : {params : {userId: string, year: number, month: number, eventId: string}}) => {
    try {
        await dbConnect();

        const userId = params.userId;
        const eventId = params.eventId;
        const year = params.year;
        const month = params.month;

        const existingCalendar = await Calendar.findOne({userId});

        if (!existingCalendar) {
            return new Response("Calendar not found", {status: 404});
        }

        const specificCalendar = existingCalendar.calendars.find((c: CalendarType) => c.month == month && c.year == year);


        if (!specificCalendar) {
            return new Response(JSON.stringify(null), {status: 404})
        }

        specificCalendar.events = specificCalendar.events.filter((e : Event) => e._id != eventId);

        await existingCalendar.save();

        return new Response("Successfully Deleted Event", {status: 200});
    }catch(error){
        return new Response("Failed to delete Event", {status: 400});
    }
}