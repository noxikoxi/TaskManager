'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Todo, TodoItem} from "@/lib/types";
import {Square, SquareCheckBig, Trash2} from "lucide-react";
import {StarIcon, StarFilledIcon} from "@radix-ui/react-icons";
import React, {Dispatch, SetStateAction} from "react";
import {deleteTodoItem, updateTodoItem} from "@/lib/actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {clsx} from "clsx";
import Item from "@/app/dashboard/todo/[id]/Item";

type Props = {
    todo: Todo,
    selectedItem: TodoItem | null,
    setSelectedItem: Dispatch<SetStateAction<TodoItem | null>>
}

type Sortable = {
    content: string,
    isDone: boolean,
    isImportant: boolean
}

export const sortFunc = (i1 : Sortable, i2 : Sortable) => {
    if(i1.isDone && !i2.isDone){
        return -1;
    }else if(!i1.isDone && i2.isDone){
        return 1;
    }

    if(i1.isImportant && !i2.isImportant){
        return -1;
    }else if(!i1.isImportant && i2.isImportant){
        return 1;
    }

    return 0;
}

const ItemsTable = ({todo, setSelectedItem, selectedItem} : Props) => {

    const router = useRouter();

    const onItemDelete = async (todoId: string, itemId: string) => {
        const result = await deleteTodoItem(todoId, itemId);
        if(result){
            router.refresh();
            toast.success("Successfully deleted item")
        }else{
            toast.error("Something went wrong")
        }
    }

    const onUpdate = async (todoId: string, itemId: string, isImportant: boolean, isDone: boolean, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const result = await updateTodoItem(todoId, itemId, isImportant, isDone);
        if(result){
            router.refresh();
            toast.success("Successfully updated item")
        }else{
            toast.error("Something went wrong")
        }
    }

    return (
        <Table>
            <TableHeader >
                <TableRow>
                    <TableHead className="w-[50px]">Done</TableHead>
                    <TableHead className="w-[50px]">Important</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className="text-right">Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {todo && todo.items.sort(sortFunc).map((item) => (
                    <TableRow
                        key={item._id}
                        onClick={() => selectedItem?._id == item._id ? setSelectedItem(null) : setSelectedItem(item)}
                        className={clsx("cursor-pointer", {"bg-muted/50" : item._id === selectedItem?._id})}
                    >
                        <TableCell className="font-medium align-top ">
                            {item.isDone ?
                                <SquareCheckBig
                                    className="hover:text-foreground/50"
                                    onClick={(event) => onUpdate(todo._id, item._id, item.isImportant, false, event)}
                                />
                                :
                                <Square
                                    className="hover:text-foreground/50"
                                    onClick={(event) => onUpdate(todo._id, item._id, item.isImportant, true, event)}
                                />
                            }
                        </TableCell>
                        <TableCell className="font-medium flex justify-center">
                            {item.isImportant ?
                                <StarFilledIcon
                                    className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 hover:text-foreground/50"
                                    onClick={(event) => onUpdate(todo._id, item._id, false, item.isDone, event)}
                                />
                                :
                                <StarIcon
                                    className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 hover:text-foreground/50"
                                    onClick={(event) => onUpdate(todo._id, item._id, true, item.isDone, event)
                                }
                                />
                            }
                        </TableCell>
                        <TableCell className="align-top"><Item item={item} todoId={todo._id}/></TableCell>
                        <TableCell className="text-right flex justify-end items-center me-1">
                            <Trash2
                                className="text-destructive hover:text-foreground cursor-pointer"
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    onItemDelete(todo._id, item._id)
                                }}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ItemsTable;