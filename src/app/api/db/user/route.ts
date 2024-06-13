import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import {NextRequest} from "next/server";
import {getSession} from "@auth0/nextjs-auth0";
import {User as UserType} from "@/lib/types";

export const GET = async(req: NextRequest) =>{
    try{
        await dbConnect();
        const session = await getSession();

        if(!session || !session.user){
            return new Response("Unauthorized: ", {status: 401});
        }

        const id = session.user.sub;

        const existingUser = await User.findOne({id : id});

        if(!existingUser){
            return new Response("User not found", {status: 404});
        }

        return new Response(JSON.stringify(existingUser), {status: 200});
    }catch(error){
        console.log("fetch user error")
        return new Response("Failed to fetch user: ", {status: 400});
    }
};

export const PUT = async (req: NextRequest) => {
    try{
        await dbConnect();
        const session = await getSession();

        if(!session || !session.user){
            return new Response("Failed to fetch user: ", {status: 400});
        }

        const data: UserType = await req.json();
        const id = session.user.sub;

        let user = await User.findOne({id});

        if(!user){
            return new Response("User not found", {status: 404});
        }

        for(const key in data){
            (user as any)[key] = (data as any)[key];
        }

        console.log(user);

        await user.save()

        return new Response(JSON.stringify(user), {status: 200});

    }catch(error){
        console.log("update user error")
        return new Response("Failed to update user: ", {status: 400});
    }
}