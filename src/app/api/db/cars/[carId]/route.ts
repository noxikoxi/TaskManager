import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Car from "@/lib/models/car";
import Todo from "@/lib/models/todo";

export const PUT = async (req : NextRequest, {params} : {params : {carId: string}}) => {
    try{
        await dbConnect();

        const data = await req.json();
        const carId = params.carId;
        data.registration = data.registration.replace(/\s+/g, '');

        const existingCar = await Car.findOne({_id: carId});

        if(!existingCar){
            return new Response("Car not found", {status: 404});
        }

        await Car.replaceOne({_id : existingCar._id}, data)

        return new Response(JSON.stringify(data), {status: 200});
    }catch(error){
        return new Response("Failed to update car", {status: 400});
    }
};

export const DELETE = async (req : NextRequest, {params} : {params : {carId: string}}) => {
    try{
        await dbConnect();
        const id = params.carId;

        const result = await Car.findOneAndDelete({_id : id});

        if(result){
            return new Response("Deleted Car: " + id, {status: 200} )
        }else{
            return new Response("Car " + id + " not found", {status: 404} )
        }

    }catch(error){
        return new Response("Failed to delete car", {status: 400});
    }
}