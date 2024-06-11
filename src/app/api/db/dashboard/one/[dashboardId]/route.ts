import dbConnect from "@/lib/dbConnect";
import {Dashboard as DashboardType, Note} from "@/lib/types";
import Dashboard from "@/lib/models/dashboard";
import {NextApiRequest} from "next";
import {NextRequest} from "next/server";

export const GET = async(req: NextApiRequest, {params} : {params : {dashboardId: string}}) => {
    try{
        await dbConnect();
        const id = params.dashboardId;

        if(id) {
            const dashboard: DashboardType | null = await Dashboard.findOne({_id: id});
            if(dashboard) {
                return new Response(JSON.stringify(dashboard), {status: 200})
            }else{
                return new Response("Dashboard not found", {status: 404});
            }
        }else{
            return new Response("Invalid id", {status: 404});
        }
    }catch (error){
        console.log("fetch dashboard error");
        return new Response(`Failed to fetch Dashboard: ${error}`, {status: 400})
    }
};

export const PUT = async (req: NextRequest, {params} : {params : {dashboardId: string}}) => {
    try{
        await dbConnect();
        const data = await req.json();
        const note = data.note;
        const name = data.name;
        const description = data.description;
        const id = params.dashboardId;

        const existingDashboard = await Dashboard.findOne({_id: id});

        if(!existingDashboard){
            return new Response("Dashboard not found", {status: 404});
        }
        if(note && note._id) { // It means update Note
            const notes = existingDashboard.notes;

            const existingNote = notes.find((n : Note) => note._id == n._id);

            existingNote.title = note.title;
            existingNote.content = note.content;
        }else{
            if(note){
                existingDashboard.notes.push(note);
            }
            if(name){
                existingDashboard.name = name;
            }
            if(description){
                existingDashboard.description = description;
            }
        }

        await existingDashboard.save();
        return new Response(JSON.stringify(existingDashboard), {status: 200})

    }catch(error){
        console.log("update dashboard error");
        return new Response(`Failed to update Dashboard: ${error}`, {status: 400})
    }
}

export const DELETE = async (req: NextRequest, {params} : {params : {dashboardId: string}}) => {
    try{
        await dbConnect();
        const id = params.dashboardId;

        const result = await Dashboard.findOneAndDelete({_id : id});

        if(result){
            return new Response("Deleted dashboard: " + id, {status: 200} )
        }else{
            return new Response("Dashboard " + id + " not found", {status: 404} )
        }
    }catch(error){
        return new Response("Failed to delete Dashboard", {status: 400});
    }
}