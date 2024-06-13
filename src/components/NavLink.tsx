'use client'

import Link from "next/link";
import {ReactComponentLike} from "prop-types";
import {clsx} from "clsx";
import {useContext} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";

type Props = {
    linkText: string,
    linkUrl: string,
    Svg: ReactComponentLike,
}
const NavLink = ({linkText, linkUrl, Svg} : Props) => {

    const {state} = useContext(SideNavContext);

    return (
        <Link
            className={clsx("flex flex-row items-center justify-start ps-10 gap-3 hover:text-background text-xl", {"text-background" : state.activeLink === linkText})}
            href={linkUrl}
        >
            <Svg />
            <span>{linkText}</span>
        </Link>
    )
}

export default NavLink;