import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notebook from "@/lib/models/notebook";
import {Note} from "@/lib/types";

export const DELETE = async(req: NextRequest, {params} : {params : {notebookId: string, noteId: string}}) => {
    try {
        await dbConnect();
        const notebookId = params.notebookId;
        const noteId = params.noteId;

        const dashboard = await Notebook.findOne({_id: notebookId});
        if(!dashboard){
            return new Response("Notebook not found", {status: 404});
        }

        dashboard.notes = [...dashboard.notes.filter((note: Note) => note._id.toString() != noteId)];

        await dashboard.save();

        return new Response("Deleted note: " + noteId, {status: 200});

    }catch(error){
        return new Response(`Failed to delete note: ${error}`, {status: 400})
    }
}