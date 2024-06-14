'use client'

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import React, {Dispatch, SetStateAction} from "react";
import {Separator} from "@/components/ui/separator";
import {Note} from "@/lib/types";

type Props = {
    title: string,
    content: string,
    createdAt: Date,
    id: string,
    selectNote: (n : Note) => void,
    showEditing: Dispatch<SetStateAction<boolean>>
}

const NoteCard = ({title, content, createdAt, selectNote, id, showEditing} : Props) =>{

    const handleSelect = () => {
        selectNote({
            _id: id,
            title,
            content,
            createdAt
        });
        showEditing(true);
    }

    return (
        <Card
            className="cursor-pointer hover:outline hover:outline-primary shadow max-h-[350px] overflow-auto relative"
            onClick={() => handleSelect()}
        >

            <div className="sticky top-0 z-10 bg-secondary">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <Separator/>
            </div>
            <div className="flex flex-col justify-between">
                <CardContent  className="text-sm w-full">
                    <pre className="whitespace-pre-wrap">
                        {content}
                    </pre>
                </CardContent>
                {createdAt &&
                    <CardFooter className="flex flex-col items-start text-sm pb-4 text-accent">
                        <span>Created:</span>
                        <span>{createdAt.toString().split("T")[0]}</span>
                    </CardFooter>
                }
            </div>
        </Card>

    )

}

export default NoteCard;