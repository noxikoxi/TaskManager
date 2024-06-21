'use client'

import {useContext, useEffect, useState} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";
import TodosTable from "@/app/dashboard/todo/TodosTable";
import {Todo} from "@/lib/types";

type Props = {
    todos: Todo[]
}
export default function Content({todos} : Props){

    const {changeActive} = useContext(SideNavContext);
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
    const [uncompletedTodos, setUncompletedTodos] = useState<Todo[]>([]);

    useEffect(() => {
        changeActive("Todos")
    }, []);

    useEffect(() => {

        const newCompletedTodos : Todo[] = [];
        const newUncompletedTodos : Todo[] = [];

        todos.forEach((todo) => {
            if(todo.items.length === 0){
                newCompletedTodos.push(todo);
            }else if(todo.items.every((item) => item.isDone)){
                newCompletedTodos.push(todo);
            }else{
                newUncompletedTodos.push(todo);
            }
        })

        setCompletedTodos(newCompletedTodos);
        setUncompletedTodos(newUncompletedTodos)
    }, [todos]);

    return (
        <div className="container flex flex-col items-center justify-center">
            <h1 className="mt-5 text-3xl font-semibold">Uncompleted</h1>
            <TodosTable todos={uncompletedTodos} isDone={false}/>
            <h1 className="text-3xl font-semibold mt-10">Completed</h1>
            <TodosTable todos={completedTodos} isDone={true}/>
        </div>
    )
}