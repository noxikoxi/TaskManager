'use client'

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import {SquareUserRound} from "lucide-react";

const MainNav = () => {
    const { user } = useUser();

    return (
        <div className="flex flex-row gap-5 items-center">
            <Link
                href="/dashboard"
                className="text-white hover:text-amber-300 font-bold text-xl"
            >
                dashboard
            </Link>
            {user && (
                <span className="flex flex-row gap-1 text-white hover:text-orange-200">
                    <SquareUserRound />
                    {user.email}
                </span>
            ) }
            {user ? (
                <Link href="/api/auth/login" className="text-white hover:text-amber-300 font-bold text-xl">
                Log Out
                </Link>
            ) : (
                <Link href="/api/auth/login" className="text-white hover:text-amber-300 font-bold text-xl">
                Log In
                 </Link>
            )}

        </div>
    )
}

export default MainNav;