'use client'

import {useContext, useEffect, useState} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";
import ItemsTable from "@/app/dashboard/todo/[id]/ItemsTable";
import {Todo, TodoItem} from "@/lib/types";
import TodoItemForm from "@/components/forms/TodoItemForm";

type Props = {
    todo: Todo
}
export default function Content({todo} : Props){

    const {changeActive} = useContext(SideNavContext);
    const [selectedItem, setSelectedItem] = useState<TodoItem | null>(null);

    useEffect(() => {
        changeActive("Todos");
    }, []);

    return (
        <div className="container mt-5 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold">{todo.name}</h1>
            <p className="font-semibold">{todo.description}</p>
            <div className="p-4 my-3 w-full relative">
                <TodoItemForm todoId={todo._id} selectedItem={selectedItem}/>
            </div>
            <ItemsTable todo={todo} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
        </div>
    )
}