import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {Dispatch, SetStateAction} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateTodo, useUpdateTodo} from "@/lib/client/TodoHooks";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, "Name must have at least 1 character").max(60, "Name cannot exceed 60 letters"),
    description: z.string().optional(),
})

export type createTodoForm = z.infer<typeof formSchema>;

export type CreateItemProps = {
    showCard: Dispatch<SetStateAction<boolean>>,
    id?: string,
    name?: string,
    description?: string,
}

const TodoForm: React.FC<CreateItemProps> = ({name, description, id, showCard}) => {
    const form = useForm<createTodoForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || "",
            description: description || ""
        },
    });

    const router = useRouter();

    const {createTodo, isLoading : isLoadingCreating} = useCreateTodo();
    const {updateTodo, isLoading : isLoadingUpdating} = useUpdateTodo();

    const handleSubmit = (data: createTodoForm) => {
        if(id){ // updating
            updateTodo(Object.assign(data, {_id: id}));
            router.refresh();
            showCard(false)
        }else{ // creating
            createTodo(data);
            router.refresh();
            showCard(false);
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
                                <Input placeholder="Todo name" {...field} />
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
                                <Input placeholder="My new todo" {...field} />
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

export default TodoForm;