'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {addTodoItem, addTodoItemSubpoint} from "@/lib/actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {TodoItem} from "@/lib/types";

const formSchema = z.object({
    content: z.string().min(1, "Content must have at least 1 character").max(250, "Content cannot exceed 250 letters"),
})

export type createTodoItemForm = z.infer<typeof formSchema>;

type Props = {
    todoId: string,
    selectedItem: TodoItem | null,
}

const TodoItemForm = ({todoId, selectedItem} : Props) => {
    const form = useForm<createTodoItemForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        },
    });

    const router = useRouter();

    const handleSubmit = async ({content} : createTodoItemForm) => {

        const item = selectedItem ? await addTodoItemSubpoint(todoId, selectedItem._id ,content):  await addTodoItem(todoId, content);

        if(item){
            router.refresh();
            toast.success("Successfully added item");
            form.reset();
        }else{
            toast.error("Something went wrong");
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-row flex-1 items-center justify-center w-full gap-5"
            >

                <FormField
                    control = {form.control}
                    name="content"
                    render = {({field}) => (
                        <FormItem className=" w-[80%] flex flex-col">
                            <FormControl>
                                <Input className="w-full" placeholder="What to do..." {...field} />
                            </FormControl>
                            <FormMessage className="absolute -bottom-2"/>
                            {selectedItem && <FormDescription className="absolute -top-4 animate-slide-in">
                                You are adding subpoint to selected item
                            </FormDescription>}
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="secondary" className="font-semibold">
                    ADD
                </Button>

            </form>
        </Form>
    )
}

export default TodoItemForm;