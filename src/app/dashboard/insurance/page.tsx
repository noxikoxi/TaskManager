'use client'

import {useContext, useEffect} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";

export default function Home() {

    const {changeActive} = useContext(SideNavContext);

    useEffect(() => {
        changeActive("insurance")
    }, []);

    return (
        <span> In building...</span>
    )
};