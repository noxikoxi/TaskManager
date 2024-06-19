import dbConnect from "@/lib/dbConnect";
import {Todo as TodoType} from "@/lib/types";
import {NextRequest} from "next/server";
import Todo from "@/lib/models/todo";

export const GET = async(req: NextRequest, {params} : {params : {todoId: string}}) => {
    try{
        await dbConnect();
        const id = params.todoId;

        if(id) {
            const todo: TodoType | null = await Todo.findOne({_id: id});
            if(todo) {
                return new Response(JSON.stringify(todo), {status: 200})
            }else{
                return new Response("Todo list not found", {status: 404});
            }
        }else{
            return new Response("Invalid id", {status: 404});
        }
    }catch (error){
        return new Response(`Failed to fetch Todos: ${error}`, {status: 400})
    }
};

export const PUT = async (req: NextRequest, {params} : {params : {todoId: string}}) => {
    try{
        await dbConnect();
        const data = await req.json();
        const id = params.todoId;


        if(Object.keys(data).length == 0){
            return new Response("No data was sent", {status: 400});
        }

        const existingTodo = await Todo.findOne({_id: id});

        if(!existingTodo){
            return new Response("Todo not found", {status: 404});
        }

        existingTodo.title = data.title
        existingTodo.description = data.description
        
        await existingTodo.save();
        return new Response(JSON.stringify(existingTodo), {status: 200})

    }catch(error){
        return new Response(`Failed to update Todo: ${error}`, {status: 400})
    }
}

export const DELETE = async (req: NextRequest, {params} : {params : {todoId: string}}) => {
    try{
        await dbConnect();
        const id = params.todoId;

        const result = await Todo.findOneAndDelete({_id : id});

        if(result){
            return new Response("Deleted todo: " + id, {status: 200} )
        }else{
            return new Response("Todo " + id + " not found", {status: 404} )
        }
    }catch(error){
        return new Response("Failed to delete Notebook", {status: 400});
    }
}