'use client'

import {Separator} from "@/components/ui/separator";
import Notifications from "@/components/Notifications";
import ItemCard from "@/components/ItemCard";
import {useState} from "react";
import { Button } from "./ui/button";
import BreadCrumb from "@/components/BreadCrumb";
import {NotebookForm as NotebookFormType} from "@/lib/types";
import NotebookForm from '@/components/forms/NotebookForm';
import NoteForm from "@/components/forms/NoteForm";
import TodoForm from "@/components/forms/TodoForm";

type Props = {
    options?: {
        Notebooks: boolean,
        Notes: boolean,
        Todo: boolean
    }
    // List of links
    linkList: string[],

    // List of visible texts
    textList: string[]

    notebook?: NotebookFormType & {id: string}
}

const DashboardTopBar = ({options, linkList, textList, notebook} : Props) => {
    const [showCard, setShowCard] = useState<boolean>(false );

    const renderText = () => {
        if(options?.Notebooks){
            return "Create Notebook"
        }else if(options?.Notes){
            return "Create Note"
        }else if(options?.Todo){
            return "Create Todo"
        }
    }


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
                                onClick={() =>setShowCard(true)}
                            >
                                {renderText()}
                            </Button>

                            {options?.Notes && (
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setShowCard(true)}
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
            {options?.Notebooks && showCard && <ItemCard
                showCard={setShowCard}
                title="Create Notebook"
                description="On notebooks you can write your notes"
                size="default"
            >
                <NotebookForm showCard={setShowCard}/>
            </ItemCard>}
            {options?.Notes && notebook && showCard && <ItemCard
                showCard={setShowCard}
                title="Edit Notebook"
                description="On notebooks you can write your notes"
                size="default"
            >
                <NotebookForm showCard={setShowCard} id={notebook.id} name={notebook.name} description={notebook.description}/>
            </ItemCard>}
            {options?.Notes && showCard && <ItemCard
                showCard={setShowCard}
                description="Write anything you want"
                title="Create your Note"
                size="lg"
            >
                <NoteForm showCard={setShowCard}/>
            </ItemCard>}
            {options?.Todo && showCard && <ItemCard
                showCard={setShowCard}
                description="Plan you tasks"
                title="Create your todo list"
                size="default"
            >
                <TodoForm showCard={setShowCard}/>
            </ItemCard>}
        </div>

    )
}

export default DashboardTopBar;