import dbConnect from "@/lib/dbConnect";
import {NextRequest} from "next/server";
import {Notebook as NotebookType} from "@/lib/types";
import {getSession} from "@auth0/nextjs-auth0";
import Notebook from "@/lib/models/notebook";


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
        data.notes = []
        const name = data.name;

        const existingNotebook = await Notebook.findOne({name, userId});

        if(existingNotebook){
            return new Response(JSON.stringify(existingNotebook), {status: 200});
        }

        const newNotebook = new Notebook(data);
        await newNotebook.save();

        return new Response(JSON.stringify(newNotebook), {status: 201});
    }catch(error){
        return new Response("Failed to create Notebook", {status: 400});
    }
};

export const GET = async(req: NextRequest) => {
    try{
        await dbConnect();
        const session = await getSession();

        if(!session || !session.user){
            return new Response("Failed to fetch notebooks: ", {status: 400});
        }

        const userId = session.user.sub;

        if(userId) {
            const userNotebooks: NotebookType[] = await Notebook.find({userId});
            return new Response(JSON.stringify(userNotebooks), {status: 200})
        }else{
            return new Response("Notebooks not found", {status: 404});
        }
    }catch (error){
        return new Response(`Failed to fetch Notebooks: ${error}`, {status: 400})
    }
}
