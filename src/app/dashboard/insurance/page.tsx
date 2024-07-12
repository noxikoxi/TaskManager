import DashboardTopBar from "@/components/DashboardTopBar";
import Content from "@/app/dashboard/insurance/content";
import {getCars} from "@/lib/Actions/CarActions";

export default async function Home() {

    const userCars = await getCars();


    return (
        <div className="relative inset-0 h-full w-full">
            <DashboardTopBar
                linkList={["/dashboard/insurance"]}
                textList={["Inspection & Insurance"]}
                options={{
                    Car: true,
                    Notes: false,
                    Todo: false,
                    Notebooks: false,
                    Event: false
                }}
            />
            <Content cars={userCars}/>
        </div>
    )
};