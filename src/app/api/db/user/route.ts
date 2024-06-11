import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import {NextRequest} from "next/server";

export const POST = async (req : NextRequest) => {
    try{
        await dbConnect();
        const data = await req.json();
        const id = data.id;

        const existingUser = await User.findOne({id});

        if(existingUser){
            return new Response("user already exists", {status: 200});
        }

        const newUser = new User(data);
        await newUser.save();

        return new Response(JSON.stringify(newUser), {status: 201});
    }catch(error){
        console.log("create user error")
        return new Response("Failed to create user", {status: 400});
    }
}