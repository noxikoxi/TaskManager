import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import {User as UserType} from "@/lib/types";
import {NextApiRequest} from "next";

export const GET =  async function (req: NextRequest, {params} : {params : {id: string}})  {
    try{
        await dbConnect();
        const id = params.id;

        console.log(req);

        const existingUser = await User.findOne({id});

        if(!existingUser){
            return new Response("User not found", {status: 404});
        }

        return new Response(JSON.stringify(existingUser), {status: 200});
    }catch(error){
        console.log("fetch user error")
        return new Response("Failed to fetch user: ", {status: 400});
    }
};