'use client'
import {useState} from "react";
import Link from "next/link";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Separator} from "@/components/ui/separator";
import {LayoutDashboard, ListTodo, UserRound} from "lucide-react";
import NavLink from "@/components/NavLink";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const SideNav = () => {
    const {user, isLoading} = useUser();
    const [selected, setSelected] = useState<string>("Dashboards");

    if(isLoading){

    }

    return (
        <nav className="sticky w-[250px] h-full bg-primary flex flex-col justify-between">
            <div>
                <div className="my-4 flex flex-row items-center justify-center flex-1 gap-2">
                    <Avatar>
                        {user?.picture && <AvatarImage src={user?.picture}/>}
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-xl">{user?.name}</span>
                </div>
                <Separator className="my-5 bg-black"/>
                <div className="grid grid-cols-1 gap-5">
                    <NavLink changeActiveFn={setSelected} active={selected} linkText="Profile" linkUrl="/dashboards/profile" Svg={UserRound}/>
                    <NavLink changeActiveFn={setSelected} active={selected} linkText="Dashboards" linkUrl="/dashboards" Svg={LayoutDashboard}/>
                    <NavLink changeActiveFn={setSelected} active={selected} linkText="Todos" linkUrl="/todo" Svg={ListTodo}/>
                </div>
            </div>
            <div className="flex flex-col items-center mb-10">
                <Link href="/api/auth/logout" className="text-foreground hover:text-background font-bold text-xl">
                    Log Out
                </Link>
            </div>
        </nav>

    )

}

export default SideNav;