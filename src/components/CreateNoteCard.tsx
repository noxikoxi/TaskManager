'use client'
import React, {Dispatch, SetStateAction} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {noteForm} from "@/lib/types";
import {usePathname} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {X} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {useCreateNote, useDeleteNote, useUpdateNote} from "@/lib/client/DashboardHooks";

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

const CreateNoteCard = ({showCard, noteTitle, noteId, noteContent} : Props) => {
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

    const path = usePathname();
    const id = String(path.split("/").at(-1))

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
            deleteNote({dashboardId: id, noteId});
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
        <div className="fixed bg-black w-full h-full top-0 left-0 bg-opacity-40 z-20">
            <Card className="fixed top-[15%] lg:top-1/3 lg:left-1/3 w-full lg:w-[600px] xl:w-[800px]">
                <X  strokeWidth={2} size={32} className="cursor-pointer text-destructive absolute top-0 right-1" onClick={() => showCard(false)} />
                <CardHeader>
                    <CardTitle>{noteId ? "Update Note" : "Create Note"}</CardTitle>
                    <CardDescription>Write anything you want</CardDescription>
                    <Separator/>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                <div>
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
                                </div>
                                <div className="col-span-2">
                                    <FormField
                                        control = {form.control}
                                        name="content"
                                        render = {({field}) => (
                                            <FormItem>
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Type your note here"
                                                        {...field}
                                                        className="w-full md:h-[300px]"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-5 items-end">
                                <Button type="submit" variant="default" className="font-semibold text-black mt-5">
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
                </CardContent>
                {isLoadingCreate && <p>Creating Note...</p>}
                {isLoadingUpdate && <p>Updating Note...</p>}
                {isLoadingDelete && <p>Deleting Note...</p>}
            </Card>
        </div>

    )

}

export default CreateNoteCard;