'use client'

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import {SquareUserRound} from "lucide-react";
import UserMenu from "@/components/UserMenu";

const MainNav = () => {
    const { user } = useUser();

    return (
        <div className="flex flex-row gap-5 items-center">
            <Link
                href="/dashboards"
                className="text-white hover:text-amber-300 font-bold text-xl"
            >
                dashboards
            </Link>
            {user && (
                <div className="flex flex-row gap-1 text-white hover:text-orange-200">
                    <SquareUserRound />
                    <UserMenu/>
                </div>
            ) }
            {user ? ( <></>
            ) : (
                <Link href="/api/auth/login" className="text-white hover:text-amber-300 font-bold text-xl">
                Log In
                 </Link>
            )}

        </div>
    )
}

export default MainNav;