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
import {ModeToggle} from "@/components/ModeToggle";

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
                    <Link href="/dashboard/profile">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/dashboard/notebooks">
                        Notebooks
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/dashboard/todo">
                        Todos
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/api/auth/logout" className="font-bold text-xl">
                        Log Out
                    </Link>
                </DropdownMenuItem>
                <div className="flex flex-row justify-center">
                    <ModeToggle/>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu;