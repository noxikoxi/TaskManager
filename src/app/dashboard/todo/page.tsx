import DashboardTopBar from "@/components/DashboardTopBar";
import Content from "@/app/dashboard/todo/content";
import {getTodos} from "@/lib/actions";

export default async function Home() {

    const todos = await getTodos();
    return (
        <div className="relative inset-0 h-full w-full">
            <DashboardTopBar
                linkList={["/dashboard/todo"]}
                textList={["Todos"]}
                options={{
                    Notebooks: false,
                    Notes: false,
                    Todo: true
                }}
            />
            <Content todos={todos}/>
        </div>
    )
};