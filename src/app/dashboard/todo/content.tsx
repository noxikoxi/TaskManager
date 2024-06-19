'use client'

import {useContext, useEffect} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";
import TodosTable from "@/components/TodosTable";
import {Todo} from "@/lib/types";

type Props = {
    todos: Todo[]
}
export default function Content({todos} : Props){

    const {changeActive} = useContext(SideNavContext);

    useEffect(() => {
        changeActive("Todos")
    }, []);

    return (
        <div className="container mt-5 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold">Uncompleted</h1>
            <TodosTable todos={todos} isDone={false}/>
            <h1 className="text-3xl font-semibold mt-10">Completed</h1>
            <TodosTable todos={todos} isDone={true}/>
        </div>
    )
}