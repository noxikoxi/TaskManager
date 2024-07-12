import DashboardTopBar from "@/components/DashboardTopBar";
import {getTodo} from "@/lib/actions";
import Content from "@/app/dashboard/todo/[id]/content";


export default async function Home({ params} : {params: {id:string}}){

    const id = params.id;
    const todo = await getTodo(id);

    return (
        <div className="relative inset-0 h-full w-full">
            <DashboardTopBar
                linkList={["/dashboard/todo", "/dashboard/todo/" + id]}
                textList={["Todos", todo.name]}
                options={{
                    Notebooks: false,
                    Notes: false,
                    Todo: true,
                    Car: false,
                    Event: false
                }}
                todo={todo}
            ></DashboardTopBar>
            <Content todo={todo}/>
        </div>
    )
}