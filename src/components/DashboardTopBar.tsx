'use client'

import {Separator} from "@/components/ui/separator";
import Notifications from "@/components/Notifications";
import CreateDashboardCard from "@/components/CreateDashboardCard";
import {useState} from "react";
import { Button } from "./ui/button";
import BreadCrumb from "@/components/BreadCrumb";
import CreateNoteCard from "@/components/CreateNoteCard";
import {dashboardForm} from "@/lib/types";

type Props = {
    options?: {
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
        <div className="md:relative absolute -mt-16 md:mt-0 top-1 left-20 w-auto md:top-0 md:left-0 bg-transparent flex flex-col md:w-full md:bg-background border-black">
            <div className="md:my-6 my-3  flex items-center justify-between">
                <div className="flex flex-row gap-5">
                    <div className="ms-0 md:ms-10 hidden lg:block">
                        <BreadCrumb linkList={linkList} textList={textList}/>
                    </div>
                    {options && (
                        <div className="flex flex-row gap-4 lg:ms-0 md:ms-5 ms-0">
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() =>setShowCreateCard(true)}
                            >
                                {options?.Dashboards ? "Create Dashboard" : "Create Note"}
                            </Button>

                            {options?.Notes && (
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setShowUpdateCard(true)}
                                >
                                    Edit Current Dashboard
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                <div className="me-10 flex-row gap-3 hidden md:flex">
                    <Notifications/>
                </div>
            </div>
            <Separator className="bg-foreground hidden md:block"/>
            {options?.Dashboards && showCreateCard && <CreateDashboardCard showCard={setShowCreateCard}/>}
            {options?.Notes && dashboard && showUpdateCard && <CreateDashboardCard
                showCard={setShowUpdateCard} id={dashboard.id} name={dashboard.name} description={dashboard.description}
            />}
            {options?.Notes && showCreateCard && <CreateNoteCard showCard={setShowCreateCard}/>}
        </div>

    )
}

export default DashboardTopBar;