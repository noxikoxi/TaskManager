'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Todo} from "@/lib/types";
import {Square, SquareCheckBig, Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import {deleteTodo} from "@/lib/actions";
import {toast} from "sonner";
import React from "react";
import DeletePopover from "@/components/DeletePopover";

type Props = {
    todos: Todo[],
    isDone: boolean,
}

const TodosTable = ({todos, isDone} : Props) => {

    const router = useRouter();

    const onDelete = async (event: React.MouseEvent, id: string) => {
        event.stopPropagation();
        event.preventDefault();
        if (await deleteTodo(id)) {
            router.refresh();
            toast.success("Deleted todo");
        }else{
            toast.error("Unable to delete todo");
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">Done</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Created Date</TableHead>
                    <TableHead className="text-right">Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {todos && todos.map((todo) => (
                    <TableRow
                        key={todo._id}
                        onClick={() => router.push("/dashboard/todo/" + todo._id)}
                        className="cursor-pointer"
                    >
                        <TableCell className="font-medium">{isDone ? <SquareCheckBig /> : <Square />}</TableCell>
                        <TableCell>{todo.name}</TableCell>
                        <TableCell>{todo.description}</TableCell>
                        <TableCell className="text-right hidden md:table-cell">{todo.createdAt.toString().split('T')[0]}</TableCell>
                        <TableCell className="flex flex-row justify-end">
                            <DeletePopover onClick={onDelete} id={todo._id}>
                                <Trash2
                                className="text-destructive hover:text-foreground"
                                onClick={(event) => event.stopPropagation()}
                                />
                            </DeletePopover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TodosTable