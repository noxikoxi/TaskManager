'use client'

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import {SquareUserRound} from "lucide-react";
import UserMenu from "@/components/UserMenu";

const MainNav = () => {
    const { user } = useUser();

    return (
        <nav className="flex flex-row gap-5 items-center">
            {user && (
                <div className="flex flex-row gap-1 hover:text-secondary ">
                    <SquareUserRound />
                    <UserMenu/>
                </div>
            ) }
            {user ? ( <></>
            ) : (
                <Link href="/api/auth/login" className=" hover:text-secondary font-bold text-xl">
                Log In
                 </Link>
            )}

        </nav>
    )
}

export default MainNav;