'use client'

import {useContext, useEffect} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";
import {withPageAuthRequired} from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Home() {

    const {changeActive} = useContext(SideNavContext);

    useEffect(() => {
        changeActive("Calendar")
    }, []);

    return (
        <span> In building...</span>
    )
});