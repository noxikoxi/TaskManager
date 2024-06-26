'use client'

import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {CalendarDays, Car, LayoutDashboard, ListTodo, Power, SquareMenu, UserRound} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import NavLink from "@/components/NavLink";
import {useGetCurrentUser} from "@/lib/client/UserHooks";
import Notifications from "@/components/Notifications";
import {ModeToggle} from "@/components/ModeToggle";

const MobileNav = () => {
    const { user, error, isLoading } = useGetCurrentUser();

    return (
        <Sheet>
            <SheetTrigger>
                <SquareMenu className="text-secondary" strokeWidth={2.0} size={45}/>
            </SheetTrigger>
            <SheetContent className="bg-secondary border-accent">
                <SheetHeader>
                    <SheetTitle>
                        {user ? (
                            <span className="flex flex-row gap-1 text-2xl font-semibold text-secondary-foreground">
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
                    <NavLink linkText="Profile" linkUrl="/dashboard/profile" Svg={UserRound}/>
                    <NavLink linkText="Notebooks" linkUrl="/dashboard/notebooks" Svg={LayoutDashboard}/>
                    <NavLink linkText="Todos" linkUrl="/dashboard/todo" Svg={ListTodo}/>
                    <NavLink linkText="Inspection & Insurance" linkUrl="/dashboard/insurance" Svg={Car}/>
                    <NavLink linkText="Calendar" linkUrl="/dashboard/calendar" Svg={CalendarDays}/>
                </SheetDescription>

                <Notifications className="ps-10 mt-3 text-black text-xl gap-3"/>

                <div className="my-10 flex flex-col items-center gap-3 text-accent-foreground ">
                    <ModeToggle/>

                    {user ? (
                        <Button variant="ghost" className="w-full  bg-accent hover:bg-accent/90 gap-1">
                            <Power size={16} strokeWidth={3}/>
                            <Link href="/api/auth/logout">Log Out</Link>
                        </Button>
                    ) : (
                        <Button className="w-full font-bold">
                            <Link href="/api/auth/login" className="font-semibold">Log In</Link>

                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav;