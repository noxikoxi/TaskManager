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
import {NotebookForm} from "@/lib/types";
import {useCreateNotebook, useUpdateNotebook} from "@/lib/client/NotebookHooks";


type Props = {
    showCard: Dispatch<SetStateAction<boolean>>,
    id?: string,
    name?: string,
    description?: string,
}

const formSchema = z.object({
    name: z.string().min(1, "Name must have at least 1 character").max(60, "Name cannot exceed 60 letters"),
    description: z.string().optional(),
})

export type createNotebookForm = z.infer<typeof formSchema>;

const CreateNotebookCard  = ({showCard, id, name, description} : Props) => {
    const form = useForm<createNotebookForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || "",
            description: description || ""
        },
    });

    const {createNotebook, isLoading: isLoadingCreating} = useCreateNotebook();
    const {updateNotebook, isLoading: isLoadingUpdating} = useUpdateNotebook();

    const handleSubmit = (data: NotebookForm) => {
        if(id){ // updating
            updateNotebook({...data, id});
            showCard(false)
        }else{ // creating
            createNotebook(data);
            showCard(false)
        }
    }

    return (
        <div className="fixed bg-black w-full h-full top-0 left-0 bg-opacity-40 z-20">
            <Card className="fixed md:top-1/3 md:left-[35%] md:w-[500px] top-1/3 right-1 w-full">
                <X  strokeWidth={2} size={32} className="cursor-pointer text-destructive absolute top-0 right-1" onClick={() => showCard(false)} />
                <CardHeader>
                    <CardTitle>{id ? "Edit Your Dashboard" : "Create Your Dashboard"}</CardTitle>
                    <CardDescription>On notebook you can write your notes</CardDescription>
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
                                            <Input placeholder="Notebook name" {...field} />
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
                                            <Input placeholder="My new notebook" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" variant="secondary" className="font-semibold text-black mt-5">
                                {id ? "Update" : "Create"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                {isLoadingCreating && <p>Creating notebook...</p>}
                {isLoadingUpdating && <p>Updating notebook...</p>}
            </Card>
        </div>
    )
}

export default CreateNotebookCard;