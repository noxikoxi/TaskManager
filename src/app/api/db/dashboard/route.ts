import dbConnect from "@/lib/dbConnect";
import Dashboard from "@/lib/models/dashboard";
import {NextRequest} from "next/server";


export const POST = async (req : NextRequest) => {
    try{
        await dbConnect();
        const data = await req.json();
        const name = data.name;

        const existingDashboard = await Dashboard.findOne({name});

        if(existingDashboard){
            return new Response(JSON.stringify(existingDashboard), {status: 200});
        }

        const newDashboard = new Dashboard(data);
        await newDashboard.save();

        return new Response(JSON.stringify(newDashboard), {status: 201});
    }catch(error){
        return new Response("Failed to create Dashboard", {status: 400});
    }
}
