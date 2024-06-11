import Link from "next/link";
import {ReactComponentLike} from "prop-types";
import {clsx} from "clsx";
import {Dispatch, SetStateAction} from "react";

type Props = {
    linkText: string,
    linkUrl: string,
    Svg: ReactComponentLike,
    active: string,
    changeActiveFn: Dispatch<SetStateAction<string>>
}
const NavLink = ({linkText, linkUrl, Svg, active, changeActiveFn} : Props) => {
    return (
        <Link
            className={clsx("flex flex-row justify-start ps-10 gap-3 hover:text-background text-xl", {"text-background" : active === linkText})}
            href={linkUrl}
            onClick={() => changeActiveFn(linkText)}
        >
            <Svg />
            <span>{linkText}</span>
        </Link>
    )
}

export default NavLink;