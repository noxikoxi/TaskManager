'use client'

import {Square, SquareCheckBig, Trash2} from "lucide-react";
import React from "react";
import {StarFilledIcon, StarIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import {deleteTodoItem, deleteTodoPoint, updateTodoItem, updateTodoPoint} from "@/lib/actions";
import {toast} from "sonner";

type Props = {
    todoId: string,
    itemId: string,
    id: string,
    content: string,
    isImportant: boolean,
    isDone: boolean
}
const Point = ({content, isDone, isImportant, todoId, itemId, id} : Props) => {

    const router = useRouter();

    const onDelete = async () => {
        const result = await deleteTodoPoint(todoId, itemId, id);
        if(result){
            router.refresh();
            toast.success("Successfully deleted point")
        }else{
            toast.error("Something went wrong")
        }
    }

    const onUpdate = async (isImportant: boolean, isDone: boolean, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const result = await updateTodoPoint(todoId, itemId, id, isImportant, isDone);
        if(result){
            router.refresh();
            toast.success("Successfully updated item")
        }else{
            toast.error("Something went wrong")
        }
    }
    return (
        <div className="flex flex-row justify-start gap-3">
            {isDone ?
                <SquareCheckBig
                    className="hover:text-foreground/50"
                    onClick={(event) => onUpdate(isImportant, false, event)}
                />
                :
                <Square
                    className="hover:text-foreground/50"
                    onClick={(event) => onUpdate(isImportant, true, event)}
                />
            }
            {isImportant ?
                <StarFilledIcon
                    className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 hover:text-foreground/50"
                    onClick={(event) => onUpdate(false, isDone, event)}
                />
                :
                <StarIcon
                    className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 hover:text-foreground/50"
                    onClick={(event) => onUpdate(true, isDone, event)}
                />
            }
            <Trash2
                className="text-destructive hover:text-foreground cursor-pointer"
                onClick={onDelete}
            />
            <span>{content}</span>
        </div>
    )
}

export default Point;