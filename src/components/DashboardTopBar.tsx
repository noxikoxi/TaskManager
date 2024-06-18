'use client'

import {Separator} from "@/components/ui/separator";
import Notifications from "@/components/Notifications";
import CreateNotebookCard from "@/components/CreateNotebookCard";
import {useState} from "react";
import { Button } from "./ui/button";
import BreadCrumb from "@/components/BreadCrumb";
import CreateNoteCard from "@/components/CreateNoteCard";
import {NotebookForm} from "@/lib/types";
import notebook from "@/lib/models/notebook";

type Props = {
    options?: {
        Notebooks: boolean,
        Notes: boolean,
    }
    // List of links
    linkList: string[],

    // List of visible texts
    textList: string[]

    notebook?: NotebookForm & {id: string}
}

const DashboardTopBar = ({options, linkList, textList, notebook} : Props) => {
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
                                {options?.Notebooks ? "Create Notebook" : "Create Note"}
                            </Button>

                            {options?.Notes && (
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setShowUpdateCard(true)}
                                >
                                    Edit Current Notebook
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                <div className="me-10 flex-row gap-3 hidden md:flex">
                    <Notifications/>
                </div>
            </div>
            <Separator className="bg-border hidden md:block"/>
            {options?.Notebooks && showCreateCard && <CreateNotebookCard showCard={setShowCreateCard}/>}
            {options?.Notes && notebook && showUpdateCard && <CreateNotebookCard
                showCard={setShowUpdateCard} id={notebook.id} name={notebook.name} description={notebook.description}
            />}
            {options?.Notes && showCreateCard && <CreateNoteCard showCard={setShowCreateCard}/>}
        </div>

    )
}

export default DashboardTopBar;