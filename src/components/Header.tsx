'use client'

import Link from 'next/link';
import MainNav from "@/components/MainNav";


const Header = () => {

    return (
        <div className="bg-background py-5">
            <div className="container flex flex-row items-center justify-between mx-auto">
                <Link className="hidden md:block font-semibold text-4xl tracking-tight" href="/">
                    Task Manager
                </Link>
                <div>
                    <MainNav/>
                </div>
            </div>
        </div>
    )

}

export default Header;