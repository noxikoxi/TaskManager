'use client'

import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {CalendarDays, Car, LayoutDashboard, ListTodo, SquareMenu, UserRound} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import NavLink from "@/components/NavLink";
import {useGetCurrentUser} from "@/lib/client/UserHooks";
import Notifications from "@/components/Notifications";

const MobileNav = () => {
    const { user, error, isLoading } = useGetCurrentUser();

    return (
        <Sheet>
            <SheetTrigger>
                <SquareMenu className="text-secondary-foreground" strokeWidth={2.0} size={45}/>
            </SheetTrigger>
            <SheetContent className="bg-secondary border-accent">
                <SheetHeader>
                    <SheetTitle>
                        {user ? (
                            <span className="flex flex-row gap-1 text-2xl font-semibold">
                                Hello {" "}
                                {user.username}
                            </span>
                        ) : (
                            <span className="font-semibold">What are you planning today?</span>
                        )}
                    </SheetTitle>
                    <Separator className="bg-accent"/>
                </SheetHeader>
                <SheetDescription className="flex flex-col gap-3 pt-3 font-semibold text-black text-xl">
                    <NavLink linkText="Profile" linkUrl="/dashboards/profile" Svg={UserRound}/>
                    <NavLink linkText="Dashboards" linkUrl="/dashboards" Svg={LayoutDashboard}/>
                    <NavLink linkText="Todos" linkUrl="/dashboards/todo" Svg={ListTodo}/>
                    <NavLink linkText="Inspection & Insurance" linkUrl="/dashboards/insurance" Svg={Car}/>
                    <NavLink linkText="Calendar" linkUrl="/dashboards/calendar" Svg={CalendarDays}/>
                    <div className="ps-10">
                        <Notifications/>
                    </div>

                    {user ? (
                        <Button variant="ghost" className="my-10 flex-1 flex-row text-secondary-foreground bg-accent hover:bg-accent/90">
                        <Link href="/api/auth/logout">Log Out</Link>

                    </Button>
                    ) : (
                    <Button className="flex-1 flex-row font-bold text-white hover:text-orange-300">
                        <Link href="/api/auth/login" className="font-semibold">Log In</Link>

                    </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav;