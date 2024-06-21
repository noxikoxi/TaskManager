import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Todo from "@/lib/models/todo";
import {TodoItem} from "@/lib/types";

type Point = {
    _id : string,
    content : string,
    isDone: boolean,
    isImportant : boolean,
}

export const PUT = async(req: NextRequest, {params} : {params : {todoId: string, itemId: string, pointId: string}}) => {
    try{
        await dbConnect();
        const id = params.todoId;
        const itemId = params.itemId;
        const pointId = params.pointId;
        const data = await req.json();

        const existingTodo = await Todo.findOne({_id : id});

        if(!existingTodo){
            return new Response("Todo " + id + " not found", {status: 404} );
        }

        const item = existingTodo.items.find((item : TodoItem) => item._id == itemId);

        if(!item){
            return new Response("Item " + id + " not found", {status: 404} );
        }

        const point : Point = item.points.find((point :Point) => point._id == pointId);

        if(!point){
            return new Response("Point " + id + " not found", {status: 404} );
        }

        point.isImportant = data.isImportant;
        point.isDone = data.isDone;

        existingTodo.save();

        return new Response(JSON.stringify(point), {status: 200});
    }catch(error){
        return new Response("Failed to update todo item", {status: 400});
    }
}

export const DELETE = async (req: NextRequest, {params} : {params : {todoId: string, itemId: string, pointId: string}}) => {
    try{
        await dbConnect();
        const id = params.todoId;
        const itemId = params.itemId;
        const pointId = params.pointId;

        const existingTodo = await Todo.findOne({_id : id});

        if(!existingTodo){
            return new Response("Todo " + id + " not found", {status: 404} );
        }

        const item = existingTodo.items.find((item : TodoItem) => item._id == itemId);

        if(!item){
            return new Response("Item " + id + " not found", {status: 404} );
        }

        item.points = item.points.filter((point : Point) => point._id != pointId);

        existingTodo.save();

        return new Response("Deleted todo point with id: " + pointId, {status: 200} )

    }catch(error){
        return new Response("Failed to delete todo item", {status: 400});
    }
}