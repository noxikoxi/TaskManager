import {NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Car from "@/lib/models/car";
import {Car as CarType} from "@/lib/types";

export const POST = async (req : NextRequest, {params} : {params : {userId: string}}) => {
    try{
        await dbConnect();

        const data = await req.json();
        const userId = params.userId;
        data["userId"] = userId;
        data.registration = data.registration.replace(/\s+/g, '');
        const registration = data.registration;

        const existingCar = await Car.findOne({userId, registration});

        if(existingCar){
            return new Response(JSON.stringify(existingCar), {status: 400});
        }

        const newCar = new Car(data);
        await newCar.save();

        return new Response(JSON.stringify(newCar), {status: 201});
    }catch(error){
        return new Response("Failed to create car", {status: 400});
    }
};

export const GET =  async(req: NextRequest, {params} : {params : {userId: string}}) => {
    try{
        await dbConnect();

        const userId = params.userId;

        if(userId) {
            const userCars: CarType[] = await Car.find({userId});
            return new Response(JSON.stringify(userCars), {status: 200})
        }else{
            return new Response("Notebooks not found", {status: 404});
        }
    }catch (error){
        return new Response(`Failed to fetch cars: ${error}`, {status: 400})
    }
}


