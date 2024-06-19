import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Todo} from "@/lib/types";

type Props = {
    todos: Todo[],
    isDone: boolean
}

const TodosTable = ({todos, isDone} : Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Done</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Created Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {todos && todos.map((todo) => (
                    <TableRow key={todo._id}>
                        <TableCell className="font-medium">{isDone}</TableCell>
                        <TableCell>{todo.title}</TableCell>
                        <TableCell>{todo.description}</TableCell>
                        <TableCell className="text-right">{todo.createdAt.toString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TodosTable