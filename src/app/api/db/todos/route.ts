import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import {getSession} from "@auth0/nextjs-auth0";
import Todo from "@/lib/models/todo";
import {Todo as TodoType} from "@/lib/types";

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
        data.items = []
        const title = data.title;

        const existingTodo = await Todo.findOne({title, userId});

        if(existingTodo){
            return new Response(JSON.stringify(existingTodo), {status: 200});
        }

        const newTodo = new Todo(data);
        await newTodo.save();

        return new Response(JSON.stringify(newTodo), {status: 201});
    }catch(error){
        return new Response("Failed to create Notebook", {status: 400});
    }
};

export const GET = async(req: NextRequest) => {
    try{
        await dbConnect();
        const session = await getSession();

        if(!session || !session.user){
            return new Response("Failed to fetch todos: ", {status: 400});
        }

        const userId = session.user.sub;

        if(userId) {
            const userTodos: TodoType[] = await Todo.find({userId});
            return new Response(JSON.stringify(userTodos), {status: 200})
        }else{
            return new Response("Notebooks not found", {status: 404});
        }
    }catch (error){
        return new Response(`Failed to fetch Notebooks: ${error}`, {status: 400})
    }
}
