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
import TodoForm, {createTodoForm} from "@/components/forms/TodoForm";
import CarForm from "@/components/forms/CarForm";

type Props = {
    options?: {
        Notebooks: boolean,
        Notes: boolean,
        Todo: boolean,
        Car: boolean
    }
    // List of links
    linkList: string[],

    // List of visible texts
    textList: string[]

    notebook?: NotebookFormType & {id: string}

    todo?: createTodoForm & {_id: string}
}

const DashboardTopBar = ({options, linkList, textList, notebook, todo} : Props) => {
    const [showCard, setShowCard] = useState<boolean>(false );
    const [showUpdateCard, setShowUpdateCard] = useState<boolean>(false );

    const renderText = () => {
        if(options?.Notebooks){
            return "Create Notebook"
        }else if(options?.Notes){
            return "Create Note"
        }else if(options?.Todo){
            return "Create Todo"
        }else if(options?.Car){
            return "Add Car"
        }
    }

    const renderUpdateText = () => {
        if(options?.Notes && notebook){
            return "Edit Notebook"
        }else if(options?.Todo && todo){
            return "Edit Todo"
        }
    }


    return (
        <div className="flex flex-col absolute top-0 left-20 w-auto -mt-[3.8em] bg-transparent md:mt-0 md:relative md:top-0 md:left-0 md:w-full md:bg-background">
            <div className="md:my-6 my-3 flex items-center justify-between">
                <div className="flex flex-row gap-5">
                    <div className="ms-0 md:ms-10 hidden lg:block">
                        <BreadCrumb linkList={linkList} textList={textList}/>
                    </div>
                    {options  && (
                        <div className="flex flex-row gap-4 lg:ms-0 md:ms-5 ms-0">
                            {!todo && (
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() =>setShowCard(true)}
                            >
                                {renderText()}
                            </Button>
                            )}

                            {options.Notes || options.Todo && todo && (
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setShowUpdateCard(true)}
                                >
                                    {renderUpdateText()}
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
            {options?.Notebooks  && showCard && <ItemCard
                showCard={setShowCard}
                title="Create Notebook"
                description="On notebooks you can write your notes"
                size="default"
            >
                <NotebookForm showCard={setShowCard}/>
            </ItemCard>}
            {options?.Notes && notebook && showUpdateCard && <ItemCard
                showCard={setShowUpdateCard}
                title="Edit Notebook"
                description="On notebooks you can write your notes"
                size="default"
            >
                <NotebookForm showCard={setShowUpdateCard} id={notebook.id} name={notebook.name} description={notebook.description}/>
            </ItemCard>}
            {options?.Notes && notebook && showCard && <ItemCard
                showCard={setShowCard}
                description="Write anything you want"
                title="Create your Note"
                size="lg"
            >
                <NoteForm showCard={setShowCard} notebookId={notebook.id} />
            </ItemCard>}
            {options?.Todo && showCard && <ItemCard
                showCard={setShowCard}
                description="Plan your tasks"
                title="Create your todo list"
                size="default"
            >
                <TodoForm showCard={setShowCard}/>
            </ItemCard>}

            {options?.Todo && todo && showUpdateCard && <ItemCard
                showCard={setShowUpdateCard}
                description="Plan your tasks"
                title="Edit your todo list"
                size="default"
            >
                <TodoForm showCard={setShowUpdateCard} name={todo.name} description={todo.description} id={todo._id}/>
            </ItemCard>}

            {options?.Car && showCard && <ItemCard
                showCard={setShowCard}
                description="Enter your car informations"
                title="Add your car"
                size="lg"
            >
                <CarForm showCard={setShowCard}/>
            </ItemCard>}


        </div>

    )
}

export default DashboardTopBar;