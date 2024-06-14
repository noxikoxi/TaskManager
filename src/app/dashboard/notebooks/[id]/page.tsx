'use client'

import {usePathname, useRouter} from "next/navigation";
import {toast} from "sonner";
import { Note} from "@/lib/types";
import NoteCard from "@/components/NoteCard";
import DashboardTopBar from "@/components/DashboardTopBar";
import {useGetNotebook} from "@/lib/client/NotebookHooks";
import CreateNoteCard from "@/components/CreateNoteCard";
import {useState} from "react";

export default function Home() {
    const pathname = usePathname();
    const id = pathname.split("/")[3];
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
        <div className="relative inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <DashboardTopBar
                options={{
                    Notebooks: false,
                    Notes: true
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
                        <p className="font-semibold text-black text-xl"> You do not have any notes yet</p>
                        <p className="font-semibold text-black text-xl"> Start creating</p>
                    </div>
                </div>
            ) : (
                <div className="p-10 grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,_1fr))]">
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
            {showUpdateCard && <CreateNoteCard
                showCard={setShowUpdateCard}
                noteId={selectedNote?._id}
                noteTitle={selectedNote?.title}
                noteContent={selectedNote?.content}
            />}
        </div>
    )
};