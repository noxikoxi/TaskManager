'use client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import React from "react";

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string
}

const DeletePopover : React.FC<Props> = ({onClick, className} : Props) => {
    return (
        <div className={className}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="secondary"
                        onClick={(event) => event.stopPropagation()}
                        type="button"
                    >
                        Delete
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">Are you sure?</span>
                        <span>This action cannot be undone.</span>
                        <span>You will <span className="underline">lose</span> your data.</span>
                        <Button
                            variant="destructive"
                            onClick={onClick}
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