'use client'

import {useContext, useEffect} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";
import DashboardTopBar from "@/components/DashboardTopBar";


export default function Home() {

    const {changeActive} = useContext(SideNavContext);

    useEffect(() => {
        changeActive("Calendar")
    }, []);

    return (
        <div className="relative inset-0">
        <DashboardTopBar
            linkList={["/dashboard/calendar"]}
            textList={["Calendar"]}
        />
        <span className="p-10"> In building...</span>
        </div>
    )
};