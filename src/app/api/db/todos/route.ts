import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import {getSession} from "@auth0/nextjs-auth0";
import Todo from "@/lib/models/todo";

export const POST = async (req : NextRequest) => {
    try{
        await dbConnect();
        const session = await getSession();

        if(!session || !session.user){
            return new Response("Unauthorized", {status: 401});
        }

        const userId = session.user.sub;
        const data = await req.json();
        data.userId = userId;
        data.items = []
        const name = data.name;

        const existingTodo = await Todo.findOne({name, userId});

        if(existingTodo){
            return new Response(JSON.stringify(existingTodo), {status: 200});
        }

        const newTodo = new Todo(data);
        await newTodo.save();

        return new Response(JSON.stringify(newTodo), {status: 201});
    }catch(error){
        return new Response("Failed to create todo", {status: 400});
    }
};

