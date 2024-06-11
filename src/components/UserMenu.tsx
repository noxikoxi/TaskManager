'use client'
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useUser} from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const UserMenu = () => {
    const {user} = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="font-semibold tr">
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-semibold">
                <DropdownMenuLabel>
                    My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link href="/dashboards/account/profile">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/dashboards">
                        Dashboards
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/api/auth/logout" className="text-black hover:text-orange-200 font-bold text-xl">
                        Log Out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu;