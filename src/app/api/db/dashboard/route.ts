import dbConnect from "@/lib/dbConnect";
import Dashboard from "@/lib/models/dashboard";
import {NextRequest} from "next/server";
import {NextApiRequest} from "next";
import {Dashboard as DashboardType} from "@/lib/types";
import {getSession} from "@auth0/nextjs-auth0";


export const POST = async (req : NextRequest) => {
    try{
        await dbConnect();
        const session = await getSession();

        if(!session || !session.user){
            return new Response("Unauthorized: ", {status: 401});
        }
        const userId = session.user.sub;
        const data = await req.json();
        data.userId = userId;
        const name = data.name;

        console.log(data);

        const existingDashboard = await Dashboard.findOne({name, userId});

        if(existingDashboard){
            return new Response(JSON.stringify(existingDashboard), {status: 200});
        }

        const newDashboard = new Dashboard(data);
        await newDashboard.save();

        return new Response(JSON.stringify(newDashboard), {status: 201});
    }catch(error){
        return new Response("Failed to create Dashboard", {status: 400});
    }
};

export const GET = async(req: NextRequest) => {
    try{
        await dbConnect();
        const session = await getSession();

        if(!session || !session.user){
            return new Response("Failed to fetch dashboards: ", {status: 400});
        }

        const userId = session.user.sub;

        if(userId) {
            const userDashboards: DashboardType[] = await Dashboard.find({userId});
            return new Response(JSON.stringify(userDashboards), {status: 200})
        }else{
            return new Response("Dashboards not found", {status: 404});
        }
    }catch (error){
        console.log("fetch dashboard error");
        return new Response(`Failed to fetch Dashboards: ${error}`, {status: 400})
    }
}
