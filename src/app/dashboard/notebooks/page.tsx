'use client'

import NotebookPreview from "@/components/NotebookPreview";
import DashboardTopBar from "@/components/DashboardTopBar";
import {useGetNotebooks} from "@/lib/client/NotebookHooks";
import {useContext, useEffect} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";


export default function Home() {

    const {notebooks, isLoading} = useGetNotebooks();
    const {changeActive} = useContext(SideNavContext);

    useEffect(() => {
        changeActive("Notebooks")
    }, []);

    if(isLoading){
        return <span>Loading...</span>
    }

    return (
        <div className="relative inset-0 h-full w-full bg-background">
            <DashboardTopBar
                options={{
                    Notebooks: true,
                    Notes: false
                }}
                linkList={["/dashboard/notebooks"]}
                textList={["Notebooks"]}
            />
            {!notebooks || notebooks.length == 0 ? (
                <div className="flex flex-1 flex-row justify-center">
                    <div className="flex flex-col items-center gap-5 p-5">
                        <p className="font-semibold text-black text-xl"> You do not have any notebooks yet</p>
                        <p className="font-semibold text-black text-xl"> Start creating</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center gap-5 pt-5 md:p-10 md:grid md:gap-5 md:grid-cols-[repeat(auto-fill,minmax(250px,_1fr))]">
                    {notebooks.map((notebook) => (
                        <NotebookPreview
                            id={notebook._id}
                            key={notebook._id}
                            createdAt={notebook.createdAt}
                            notesNumber={notebook.notes.length}
                            title={notebook.name}
                            description={notebook.description}
                        />
                    ))
                    }
                </div>
            )
            }

        </div>
    )

};
