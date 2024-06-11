import dbConnect from "@/lib/dbConnect";
import {Dashboard as DashboardType} from "@/lib/types";
import Dashboard from "@/lib/models/dashboard";
import {NextApiRequest} from "next";

export const GET = async(req: NextApiRequest, {params} : {params : {userId: string}}) => {
    try{
        await dbConnect();

        const userId = params.userId;
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