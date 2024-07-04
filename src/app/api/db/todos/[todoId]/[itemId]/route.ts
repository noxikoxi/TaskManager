import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Todo from "@/lib/models/todo";
import {TodoItem} from "@/lib/types";

export const DELETE = async (req: NextRequest, {params} : {params : {todoId: string, itemId: string}}) => {
    try{
        await dbConnect();
        const id = params.todoId;
        const itemId = params.itemId;

        const existingTodo = await Todo.findOne({_id : id});

        if(!existingTodo){
            return new Response("Todo " + id + " not found", {status: 404} );
        }

        existingTodo.items = existingTodo.items.filter((item : TodoItem) => item._id != itemId);
        existingTodo.save();

        return new Response("Deleted todo item with id: " + itemId, {status: 200} )

    }catch(error){
        return new Response("Failed to delete todo item", {status: 400});
    }
}

export const PUT = async(req: NextRequest, {params} : {params : {todoId: string, itemId: string}}) => {
    try{
        await dbConnect();
        const id = params.todoId;
        const itemId = params.itemId;
        const data = await req.json();

        const existingTodo = await Todo.findOne({_id : id});

        if(!existingTodo){
            return new Response("Todo " + id + " not found", {status: 404} );
        }

        const item = existingTodo.items.find((item : TodoItem) => item._id == itemId);

        if(!item){
            return new Response("Item " + id + " not found", {status: 404} );
        }

        if(data.content){ // Add a point
            const point = {
                content : data.content
            }
            item.points.push(point);
        }else{ // Update
            item.isImportant = data.isImportant;
            item.isDone = data.isDone;
        }



        existingTodo.save();

        return new Response(JSON.stringify(existingTodo), {status: 200});
    }catch(error){
        return new Response("Failed to update todo item", {status: 400});
    }
}
