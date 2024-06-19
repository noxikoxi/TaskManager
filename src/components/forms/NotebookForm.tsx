import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {Dispatch, SetStateAction} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateNotebook, useUpdateNotebook} from "@/lib/client/NotebookHooks";
import {CreateItemProps} from "@/components/ItemCard";

const formSchema = z.object({
    name: z.string().min(1, "Name must have at least 1 character").max(60, "Name cannot exceed 60 letters"),
    description: z.string().optional(),
})

export type createNotebookForm = z.infer<typeof formSchema>;

export type CreateItemProps = {
    showCard: Dispatch<SetStateAction<boolean>>,
    id?: string,
    name?: string,
    description?: string,
}

const NotebookForm: React.FC<CreateItemProps> = ({name, description, id, showCard}) => {
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
                <Button type="submit" variant="secondary" className="font-semibold mt-5">
                    {id ? "Update" : "Create"}
                </Button>
            </form>
        </Form>
    )
}

export default NotebookForm;