import DashboardTopBar from "@/components/DashboardTopBar";
import Content from "@/app/dashboard/todo/content";
import {getTodos} from "@/lib/actions";

export default async function Home() {

    const todos = await getTodos();

    return (
        <div>
            <DashboardTopBar
                linkList={["/dashboard/todo"]}
                textList={["Todos"]}
                options={{
                    Notebooks: false,
                    Notes: false,
                    Todo: true
                }}
            ></DashboardTopBar>
            <Content todos={todos}/>
        </div>
    )
};