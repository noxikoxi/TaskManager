'use client'
import React, {Dispatch, SetStateAction} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateNote, useDeleteNote, useUpdateNote} from "@/lib/client/NotebookHooks";
import {noteForm} from "@/lib/types";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

type Props = {
    showCard: Dispatch<SetStateAction<boolean>>,
    noteId?: string,
    noteTitle?: string,
    noteContent?: string
}

const formSchema = z.object({
    title: z.string().min(1, "Title must have at least 1 character").max(60, "Title cannot exceed 60 letters"),
    content: z.string().min(1, "Content must have at least 1 character")
})

export type createNoteForm = z.infer<typeof formSchema>;

const NoteForm = ({showCard, noteTitle, noteId, noteContent} : Props) => {
    const form = useForm<createNoteForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: noteTitle || "",
            content: noteContent || ""
        },
    });

    const {createNote, isLoading: isLoadingCreate} = useCreateNote();
    const {updateNote, isLoading: isLoadingUpdate} = useUpdateNote();
    const {deleteNote, isLoading: isLoadingDelete} = useDeleteNote();

    const handleCreateNote = (formData: noteForm) => {
        createNote({
            id,
            title : formData.title,
            content : formData.content
        });
        showCard(false);
    }

    const handleUpdateNote = (formData: noteForm) => {
        updateNote({
            id,
            noteId,
            title: formData.title,
            content: formData.content
        })
        showCard(false);
    }

    const handleDeleteNote = () => {
        if(noteId) {
            deleteNote({notebookId: id, noteId});
        }
        showCard(false);
    }

    const onSubmit = (formData: noteForm) => {
        if(noteId){ // Updating
            handleUpdateNote(formData);
        }else{ // creating
            handleCreateNote(formData);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-full flex flex-col justify-between"
            >
                <div className="h-full flex flex-col md:grid md:gap-5 md:grid-cols-3">
                    <FormField
                        control = {form.control}
                        name="title"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Note title"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control = {form.control}
                        name="content"
                        render = {({field}) => (
                            <FormItem className="h-full flex-1 md:col-span-2">
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Type your note here"
                                        {...field}
                                        className="w-full min-h-[300px] h-full md:h-[400px]"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-row gap-5 items-end">
                    <Button type="submit" variant="secondary" className="font-semibold mt-5">
                        {noteId ? "Update" : "Create"}
                    </Button>
                    {noteId &&
                        <Button type="button" variant="destructive" onClick={handleDeleteNote}>
                            Delete
                        </Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default NoteForm;