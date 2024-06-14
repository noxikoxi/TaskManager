import dbConnect from "@/lib/dbConnect";
import {Notebook as NotebookType, Note} from "@/lib/types";
import Dashboard from "@/lib/models/notebook";
import {NextRequest} from "next/server";
import Notebook from "@/lib/models/notebook";

export const GET = async(req: NextRequest, {params} : {params : {notebookId: string}}) => {
    try{
        await dbConnect();
        const id = params.notebookId;

        if(id) {
            const notebook: NotebookType | null = await Notebook.findOne({_id: id});
            if(notebook) {
                return new Response(JSON.stringify(notebook), {status: 200})
            }else{
                return new Response("Notebook not found", {status: 404});
            }
        }else{
            return new Response("Invalid id", {status: 404});
        }
    }catch (error){
        return new Response(`Failed to fetch Dashboard: ${error}`, {status: 400})
    }
};

export const PUT = async (req: NextRequest, {params} : {params : {notebookId: string}}) => {
    try{
        await dbConnect();
        const data = await req.json();
        const note = data.note;
        const name = data.name;
        const description = data.description;
        const id = params.notebookId;


        if(Object.keys(data).length == 0){
            return new Response("No data was sent", {status: 400});
        }

        const existingNotebook = await Notebook.findOne({_id: id});

        if(!existingNotebook){
            return new Response("Notebook not found", {status: 404});
        }
        if(note._id) { // It means update Note
            const notes = existingNotebook.notes;

            const existingNote = notes.find((n : Note) => note._id == n._id);

            existingNote.title = note.title;
            existingNote.content = note.content;
        }else{
            if(Object.keys(note).length != 0){
                existingNotebook.notes.push(note);
            }
            if(name){
                existingNotebook.name = name;
            }
            if(description){
                existingNotebook.description = description;
            }
        }

        await existingNotebook.save();
        return new Response(JSON.stringify(existingNotebook), {status: 200})

    }catch(error){
        return new Response(`Failed to update Notebook: ${error}`, {status: 400})
    }
}

export const DELETE = async (req: NextRequest, {params} : {params : {notebookId: string}}) => {
    try{
        await dbConnect();
        const id = params.notebookId;

        const result = await Notebook.findOneAndDelete({_id : id});

        if(result){
            return new Response("Deleted notebook: " + id, {status: 200} )
        }else{
            return new Response("Notebook " + id + " not found", {status: 404} )
        }
    }catch(error){
        return new Response("Failed to delete Notebook", {status: 400});
    }
}