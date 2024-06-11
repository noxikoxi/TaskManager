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
import {Bell, ChevronDown} from "lucide-react";
import {Separator} from "@/components/ui/separator";

const Notifications = () => {
    const {user} = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row gap-1 font-semibold text-foreground items-center">
                <Bell size={22} />
                <span>Notifications</span>
                <ChevronDown size={22}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-semibold">
                <DropdownMenuLabel>
                    Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-foreground"/>
                <DropdownMenuItem>
                    You have 0 notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Notifications;