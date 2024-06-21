'use client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import React from "react";

type Props = {
    onClick: (event: React.MouseEvent, id: string) => void,
    className?: string,
    children: React.ReactNode
    id: string;
}

const DeletePopover : React.FC<Props> = ({onClick, className, children, id} : Props) => {
    return (
        <div className={className}>
            <Popover>
                <PopoverTrigger asChild>
                    {children}
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">Are you sure?</span>
                        <span>This action cannot be undone.</span>
                        <span>You will <span className="underline">lose</span> your data.</span>
                        <Button
                            variant="destructive"
                            onClick={(event) => onClick(event, id)}
                            type="button"
                            className="mt-2"
                        >
                            Yes, Delete
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DeletePopover;