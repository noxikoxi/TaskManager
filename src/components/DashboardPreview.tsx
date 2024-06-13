'use client'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {useRouter} from "next/navigation";
import DeletePopover from "@/components/DeletePopover";
import {useDeleteDashboard} from "@/lib/client/DashboardHooks";

type Props = {
    id : string
    title: string,
    description? : string,
    createdAt?: Date,
    notesNumber: number,
}
const DashboardPreview = ({id, title, description, createdAt, notesNumber} : Props) => {
    const router = useRouter();

    const { deleteDashboard} = useDeleteDashboard();

    const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        deleteDashboard(id);
    }


    return (
        <Card
            className="cursor-pointer hover:outline hover:outline-primary shadow-md relative"
            onClick={() => router.push("/dashboards/" + id)}
        >
            <DeletePopover onClick={onDelete} className="absolute top-2 right-2 rounded-full"/>
            <CardHeader className="pb-4">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Separator/>
            <CardContent className="mt-4">
                <span>Contains {notesNumber} notes</span>
            </CardContent>
            {createdAt &&
                <CardFooter className="flex flex-col items-start text-sm pb-4 text-accent">
                    <span>Created:</span>
                    <span>{createdAt.toString().split("T")[0]}</span>
                </CardFooter>
            }
        </Card>
    )
}

export default DashboardPreview;