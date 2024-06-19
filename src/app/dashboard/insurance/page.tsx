'use client'

import {useContext, useEffect} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";
import NotebookForm from "@/components/forms/NotebookForm";

export default function Home() {

    const {changeActive} = useContext(SideNavContext);

    useEffect(() => {
        changeActive("Inspection & Insurance")
    }, []);

    return (
        <div className="container">
            <span> In building...</span>
        </div>
    )
};