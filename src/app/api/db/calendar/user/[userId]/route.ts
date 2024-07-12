import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Calendar from "@/lib/models/calendar";
import {Calendar as CalendarType} from "@/lib/types";

export const POST = async (req : NextRequest, {params} : {params : {userId: string}}) => {
    try{
        await dbConnect();

        const data = await req.json();
        const userId = params.userId;
        const month = data.month;
        const year = data.year;

        const eventDate = new Date();
        eventDate.setUTCMonth(month);
        eventDate.setUTCFullYear(year);
        eventDate.setUTCDate(data.day);
        eventDate.setHours(data.time.split(":")[0]);
        eventDate.setMinutes(data.time.split(":")[1]);

        let existingCalendar = await Calendar.findOne({userId});

        if(!existingCalendar){
            existingCalendar = new Calendar({
                userId: userId,
                calendars: [
                        {
                            month: month,
                            year: year,
                            events: []
                        }
                    ]
            })
        }

        const calendar = existingCalendar.calendars.find((c : CalendarType) => c.month === month && c.year === year);

        if(!calendar){
            existingCalendar.calendars.push({
                month: month,
                year: year,
                events: [
                    {
                        title: data.title,
                        description: data.description,
                        isImportant: data.isImportant,
                        date: eventDate
                    }
                ]
            })
        }else {
            calendar.events.push({
                title: data.title,
                description: data.description,
                isImportant: data.isImportant,
                date: eventDate
            })
        }

        await existingCalendar.save();

        return new Response(JSON.stringify(existingCalendar),{status: 201});
    }catch(error){
        return new Response("Failed to create Event", {status: 400});
    }
};