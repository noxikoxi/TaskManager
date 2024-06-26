'use client'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {useRouter} from "next/navigation";
import DeletePopover from "@/components/DeletePopover";
import {useDeleteNotebook} from "@/lib/client/NotebookHooks";
import {Button} from "@/components/ui/button";

type Props = {
    id : string
    title: string,
    description? : string,
    createdAt: Date,
    notesNumber: number,
}
const NotebookPreview = ({id, title, description, createdAt, notesNumber} : Props) => {
    const router = useRouter();

    const { deleteNotebook} = useDeleteNotebook();

    const onDelete = (event: React.MouseEvent, id: string) => {
        event.preventDefault();
        event.stopPropagation();
        deleteNotebook(id);
    }


    return (
        <Card
            className="cursor-pointer hover:outline hover:outline-primary shadow-md relative"
            onClick={() => router.push("/dashboard/notebooks/" + id)}
        >
            <DeletePopover onClick={onDelete} id={id} className="absolute top-2 right-2 rounded-full">
                <Button
                    variant="secondary"
                    onClick={(event) => event.stopPropagation()}
                    type="button"
                >
                    Delete
                </Button>
            </DeletePopover>
            <CardHeader className="pb-4">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Separator/>
            <CardContent className="mt-4">
                <span>Contains {notesNumber} notes</span>
            </CardContent>
            <CardFooter className="flex flex-col items-start text-sm pb-4 text-accent">
                <span>Created:</span>
                <span>{createdAt.toString().split("T")[0]}</span>
            </CardFooter>
        </Card>
    )
}

export default NotebookPreview;