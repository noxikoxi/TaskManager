'use client'
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Bell, ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils";

type Props = {
    className? : string
}

const Notifications = ({className} : Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={cn("flex flex-row gap-1 font-semibold items-center", className)}>
                <Bell size={22} />
                <span>Notifications</span>
                <ChevronDown size={22}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-semibold text-foreground">
                <DropdownMenuLabel>
                    Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    You have 0 notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Notifications;