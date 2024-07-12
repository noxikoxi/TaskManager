'use client'

import {Event} from "@/lib/types";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Circle, CircleAlert, Trash2} from "lucide-react";
import React, {useState} from "react";
import {deleteEvent} from "@/lib/Actions/CalendarActions";
import {toast} from "sonner";
import {useQueryClient} from "react-query";

type Props = {
    events: Event[]
}

const EventList = ({events} : Props) => {

    const queryClient = useQueryClient();
    const [dayEvents, setEvents] = useState<Event[]>(events)

    const onDelete = async (year: number, month: number, eventId: string) => {
        const result = await deleteEvent(year,month,eventId);

        if(result){
            queryClient.invalidateQueries("fetchCalendar");
            setEvents((prev) => prev.filter((e) => e._id != eventId));
            toast.success("Succesfully Deleted Event");
        }else{
            toast.error("Something went wrong");
        }
    }


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">Important</TableHead>
                    <TableHead className="w-[50px]">Time</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dayEvents.sort((e1, e2) => new Date(e1.date).getTime() < new Date(e2.date).getTime() ? -1 : 1).map((e) => (
                    <TableRow
                        key={e._id}
                        // onClick={() => router.push("/dashboard/todo/" + todo._id)}
                    >
                        <TableCell className="font-medium">{e.isImportant ?  <CircleAlert size={18} /> : <Circle size={18} />}</TableCell>
                        <TableCell className="font-medium">{new Date(e.date).toLocaleTimeString("default", {hour: "2-digit", minute: "2-digit"})}</TableCell>
                        <TableCell>{e.title}</TableCell>
                        <TableCell>{e.description}</TableCell>
                        <TableCell className="flex flex-row justify-end">
                                <Trash2
                                    className="text-destructive hover:text-foreground cursor-pointer"
                                    onClick={() => {
                                        const temp = new Date(e.date);
                                        onDelete(temp.getUTCFullYear(), temp.getUTCMonth(), e._id)
                                    }}
                                />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default EventList;