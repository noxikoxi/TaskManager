import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Todo from "@/lib/models/todo";
import {Todo as TodoType} from "@/lib/types";

export const GET = async(req: NextRequest, {params} : {params : {userId: string}}) => {
    try{
        await dbConnect();

        const userId = params.userId;

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
