'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {Dispatch, SetStateAction} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {createCar, deleteCar, updateCar} from "@/lib/Actions/CarActions";
import {toast} from "sonner";
import {Car} from "@/lib/types";
import DeletePopover from "@/components/DeletePopover";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    brand: z.string().min(1, "Brand must have at least 1 character").max(60, "Brand cannot exceed 60 letters"),
    description: z.string().optional(),
    inspectionTo: z.date({
        required_error: "Inspection Date is required"
    }),
    insuranceTo: z.date({
        required_error: "Insurance Date is required"
    }),
    registration: z.string().min(1, "Registration must have at least 1 character").max(60, "Registration cannot exceed 60 letters"),
    productionYear: z.string().refine((val) => val === "" ? true : !isNaN(Number(val)) && Number(val) > 0, {message: "Invalid Year"}).optional(),
    insurancePrice: z.string().refine((val) => val === "" ? true : !isNaN(Number(val)) && Number(val) > 0, {message: "Invalid Price"}).optional(),
    model: z.string().min(1, "Model must have at least 1 character").max(60, "Model cannot exceed 60 letters"),
})

export type createCarForm = z.infer<typeof formSchema>;

export type Props = {
    showCard: Dispatch<SetStateAction<boolean>>,
    car?: Car | null
}

const CarForm = ({showCard, car} : Props) => {
    const form = useForm<createCarForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            brand: car?.brand || "",
            description: car?.description || "",
            inspectionTo: car?.inspectionTo ? new Date(new Date(car.inspectionTo).setDate(new Date(car.inspectionTo).getDate() - 1)) :  new Date(),
            insuranceTo: car?.insuranceTo ?  new Date(new Date(car.insuranceTo).setDate(new Date(car.insuranceTo).getDate() - 1)) :  new Date(),
            registration: car?.registration || "",
            model: car?.model || "",
            insurancePrice: car?.insurancePrice ? String(car.insurancePrice) : "",
            productionYear: car?.productionYear ? String(car.productionYear) : ""
        },
    });

    const router = useRouter();

    const handleDelete = async () => {
        if(car && car._id) {
            let result = await deleteCar(car?._id);
            if(result){
                toast("Succesfully Deleted a Car");
                router.refresh();
            }else{
                toast("Something went wrong");
            }
        }
        showCard(false);
    }

    const handleSubmit = async (data: createCarForm) => {
        let result: null;

        if(car){
            result = await updateCar({...data, userId : car.userId, _id : car._id});
        }else {
            result = await createCar(data);
        }

        if(result){
            toast(`Succesfully ${car ? "Updated" : "Created" } a Car`);
        }else{
            toast("Something went wrong");
        }

        showCard(false);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col md:grid gap-5 grid-cols-2 grid-rows-4"
            >
                <FormField
                    control = {form.control}
                    name="brand"
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                                <Input placeholder="Brand name..." {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control = {form.control}
                    name="model"
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                                <Input placeholder="Model..." {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control = {form.control}
                    name="registration"
                    render = {({field}) => (
                        <FormItem >
                            <FormLabel>Registration Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Registration number..." {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control = {form.control}
                    name="productionYear"
                    render = {({field}) => (
                        <FormItem >
                            <FormLabel>Year of Production</FormLabel>
                            <FormControl>
                                <Input placeholder="Production Year" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control = {form.control}
                    name="description"
                    render = {({field}) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="..." {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control = {form.control}
                    name="insurancePrice"
                    render = {({field}) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Insurance Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Price.." {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="insuranceTo"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Insurance Valid Until</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={new Date()}
                                        onSelect={field.onChange}
                                        disabled={(date : Date) =>
                                            date <= new Date()
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control = {form.control}
                    name="inspectionTo"
                    render = {({field}) => (
                        <FormItem className="flex flex-col ">
                            <FormLabel>Inspection Valid Until</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={new Date()}
                                        onSelect={field.onChange}
                                        disabled={(date : Date) =>
                                            date <= new Date()
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" variant="secondary" className="font-semibold">
                    {car ? "Update" : "Add"}
                </Button>
                {car && <DeletePopover onClick={handleDelete} id={car._id}>
                    <Button type="button" variant="destructive" className="w-full">
                        Delete
                    </Button>
                </DeletePopover>}
            </form>
        </Form>
    )

}

export default CarForm;