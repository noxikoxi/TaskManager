'use client'

import {Separator} from "@/components/ui/separator";
import {LayoutDashboard, ListTodo, UserRound, Car, CalendarDays, CircleUserRound} from "lucide-react";
import NavLink from "@/components/NavLink";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useGetCurrentUser} from "@/lib/client/UserHooks";
import {useUser} from "@auth0/nextjs-auth0/client";

const SideNav = () => {
    const {user, isLoading} = useGetCurrentUser();
    const router = useRouter();

    const fallBack = () => {
        if(user && user.firstName && user.lastName){
            return user.firstName[0] + user.lastName[0];
        }else{
            return <CircleUserRound size={45} />;
        }
    }

    return (
        <nav className="sticky w-[250px] h-full bg-primary flex flex-col justify-between">
            <div>
                <div className="my-4 flex flex-row items-center justify-center flex-1 gap-2">
                    <Avatar>
                        {user?.picture && <AvatarImage src={user?.picture}/>}
                        <AvatarFallback>{fallBack()}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-xl">{user?.username}</span>
                </div>
                <Separator className="my-5 bg-black"/>
                <div className="grid grid-cols-1 gap-5">
                    <NavLink linkText="Profile" linkUrl="/dashboards/profile" Svg={UserRound}/>
                    <NavLink linkText="Dashboards" linkUrl="/dashboards" Svg={LayoutDashboard}/>
                    <NavLink linkText="Todos" linkUrl="/dashboards/todo" Svg={ListTodo}/>
                    <NavLink linkText="Inspection & Insurance" linkUrl="/dashboards/insurance" Svg={Car}/>
                    <NavLink linkText="Calendar" linkUrl="/dashboards/calendar" Svg={CalendarDays}/>
                </div>
            </div>
            <div className="flex flex-col items-center mb-10">
                <Button variant="ghost" className="w-3/4 bg-accent hover:bg-accent/80 rounded-full font-semibold " onClick={() => router.push("/api/auth/logout")}>
                    Log Out
                </Button>
            </div>

        </nav>

    )

}

export default SideNav;