'use client'

import {useRouter} from "next/navigation";
import {toast} from "sonner";
import { Note} from "@/lib/types";
import NoteCard from "@/components/NoteCard";
import DashboardTopBar from "@/components/DashboardTopBar";
import {useGetNotebook} from "@/lib/client/NotebookHooks";
import {useState} from "react";
import ItemCard from "@/components/ItemCard";
import NoteForm from "@/components/forms/NoteForm";

export default function Home({params} : {params : {id: string}}) {
    const id = params.id;
    const router = useRouter();

    const [showUpdateCard, setShowUpdateCard] = useState<boolean>(false);
    const [selectedNote, setSelectedNote] = useState<Note>();

    if(id == ""){
        toast.error("Something went wrong, please try again");
        router.push("/dashboard/notebooks");
    }

    const {isLoading, notebook} = useGetNotebook(id);

    if(isLoading){
        return <span>Loading Notes...</span>
    }

    return (
        <div className="relative h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <DashboardTopBar
                options={{
                    Notebooks: false,
                    Notes: true,
                    Todo: false,
                    Car: false,
                    Event: false
                }}
                linkList={["/dashboard/notebooks", ""]}
                textList={["Notebooks", notebook.name]}
                notebook={{
                    id: notebook._id,
                    name: notebook.name,
                    description: notebook.description
                }}
            />
            {notebook.notes.length == 0 && !isLoading ? (
                <div className="flex flex-1 flex-row justify-center">
                    <div className="flex flex-col items-center gap-5 p-5">
                        <p className="font-semibold text-xl"> You do not have any notes yet</p>
                        <p className="font-semibold text-xl"> Start creating</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-10 pt-5 md:p-10 md:grid md:gap-5 md:grid-cols-[repeat(auto-fill,minmax(350px,_1fr))]">
                    {notebook.notes.map((note : Note) => (
                        <NoteCard
                            key={note._id}
                            id={note._id}
                            title={note.title}
                            content={note.content}
                            createdAt={note.createdAt}
                            selectNote={setSelectedNote}
                            showEditing={setShowUpdateCard}
                        />
                    ))}
                </div>
            )}
             {showUpdateCard && <ItemCard
                    showCard={setShowUpdateCard}
                    title="Edit your note"
                    description="Feel free to change anything"
                    size="lg"
                >
                <NoteForm showCard={setShowUpdateCard}
                          noteId={selectedNote?._id}
                          noteTitle={selectedNote?.title}
                          noteContent={selectedNote?.content}
                          notebookId={id}
                />

                </ItemCard> }
        </div>
    )
};
