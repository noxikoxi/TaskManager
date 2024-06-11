'use client'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from '@/components/ui/separator';
import React, {Dispatch, SetStateAction} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import {dashboardForm} from "@/lib/types";
import {useCreateDashboard, useUpdateDashboard} from "@/lib/client/hooks";


type Props = {
    hideCard: Dispatch<SetStateAction<boolean>>,
    id?: string,
    name?: string,
    description?: string,
}

const formSchema = z.object({
    name: z.string().min(1, "Name must have at least 1 character").max(60, "Name cannot exceed 60 letters"),
    description: z.string().optional(),
})

export type createDashboardForm = z.infer<typeof formSchema>;

const CreateDashboardCard = ({hideCard, id, name, description} : Props) => {
    const form = useForm<createDashboardForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || "",
            description: description || ""
        },
    });

    const {createDashboard, isLoading: isLoadingCreating} = useCreateDashboard();
    const {updateDashboard, isLoading: isLoadingUpdating} = useUpdateDashboard();

    const handleSubmit = (data: dashboardForm) => {
        if(id){ // updating
            updateDashboard({...data, id});
            hideCard(false);
        }else{ // creating
            createDashboard(data);
            hideCard(false);
        }

    }

    return (
        <div className="fixed bg-black w-full h-full top-0 left-0 bg-opacity-40 z-20">
            <Card className="fixed top-1/3 left-1/2 w-[300px]">
                <X  strokeWidth={2} size={32} className="cursor-pointer text-destructive absolute top-0 right-1" onClick={() => hideCard(false)} />
                <CardHeader>
                    <CardTitle>{id ? "Edit Your Dashboard" : "Create Your Dashboard"}</CardTitle>
                    <CardDescription>On dashboard you can write your notes</CardDescription>
                    <Separator/>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <FormField
                                control = {form.control}
                                name="name"
                                render = {({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Dashboard name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control = {form.control}
                                name="description"
                                render = {({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="My new dashboard" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" variant="default" className="font-semibold text-black mt-5">
                                {id ? "Update" : "Create"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                {isLoadingCreating && <p>Creating dashboard...</p>}
                {isLoadingUpdating && <p>Updating dashboard...</p>}
            </Card>
        </div>
    )
}

export default CreateDashboardCard;