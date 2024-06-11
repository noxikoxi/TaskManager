import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Dashboard from "@/lib/models/dashboard";
import {Note} from "@/lib/types";

export const DELETE = async(req: NextRequest, {params} : {params : {dashboardId: string, noteId: string}}) => {
    try {
        await dbConnect();
        const dashboardId = params.dashboardId;
        const noteId = params.noteId;

        const dashboard = await Dashboard.findOne({_id: dashboardId});
        if(!dashboard){
            return new Response("Dashboard not found", {status: 404});
        }

        dashboard.notes = [...dashboard.notes.filter((note: Note) => note._id.toString() != noteId)];

        await dashboard.save();

        return new Response("Deleted note: " + noteId, {status: 200});

    }catch(error){
        console.log("delete note error");
        return new Response(`Failed to delete note: ${error}`, {status: 400})
    }
}