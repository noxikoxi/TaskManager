'use client'

import {Separator} from "@/components/ui/separator";
import Notifications from "@/components/Notifications";
import CreateDashboardCard from "@/components/CreateDashboardCard";
import {useState} from "react";
import { Button } from "./ui/button";
import BreadCrumb from "@/components/BreadCrumb";
import CreateNoteCard from "@/components/CreateNoteCard";
import {createDashboard} from "@/lib/actions";
import {Dashboard, dashboardForm} from "@/lib/types";

type Props = {
    options: {
        Dashboards: boolean,
        Notes: boolean,
    }
    // List of links
    linkList: string[],

    // List of visible texts
    textList: string[]

    dashboard?: dashboardForm & {id: string}
}

const DashboardTopBar = ({options, linkList, textList, dashboard} : Props) => {
    const [showCreateCard, setShowCreateCard] = useState<boolean>(false );
    const [showUpdateCard, setShowUpdateCard] = useState<boolean>(false );

    return (
        <div className="flex flex-col w-full bg-background border-black">
            <div className="mt-5 flex items-center justify-between">
                <div className="flex flex-row gap-5">
                    <div className="ms-10">
                        <BreadCrumb linkList={linkList} textList={textList}/>
                    </div>
                        <div className="flex flex-row gap-5">
                            <Button
                                size="sm"
                                variant="default"
                                onClick={() =>setShowCreateCard(true)}
                            >
                                {options.Dashboards ? "Create Dashboard" : "Create Note"}
                            </Button>
                            {options.Notes && (
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setShowUpdateCard(true)}
                                >
                                    Edit Current Dashboard
                                </Button>
                            )}
                        </div>

                </div>
                <div className="me-10 flex flex-row gap-3">
                    <Notifications/>
                </div>
            </div>
            <Separator className="mt-4 bg-foreground"/>
            {options.Dashboards && showCreateCard && <CreateDashboardCard hideCard={setShowCreateCard}/>}
            {options.Notes && dashboard && showUpdateCard && <CreateDashboardCard
                hideCard={setShowUpdateCard} id={dashboard.id} name={dashboard.name} description={dashboard.description}
            />}
            {options.Notes && showCreateCard && <CreateNoteCard hideCard={setShowCreateCard}/>}
        </div>

    )
}

export default DashboardTopBar;