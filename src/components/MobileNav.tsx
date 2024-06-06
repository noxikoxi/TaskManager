'use client'

import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {SquareMenu} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import { useUser } from '@auth0/nextjs-auth0/client';

const MobileNav = () => {
    const { user, error, isLoading } = useUser();

    return (
        <Sheet>
            <SheetTrigger>
                <SquareMenu className="text-orange-200" strokeWidth={2.0} size={40}/>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        {user ? (
                            <span className="flex flex-row gap-1 text-black">
                                Hello {" "}
                                {user.email}
                            </span>
                        ) : (
                            <span className="font-semibold">What are you planning today?</span>
                        )}
                    </SheetTitle>
                    <Separator/>
                </SheetHeader>
                <SheetDescription className="flex flex-col gap-3 pt-3 font-semibold text-black text-xl">
                    <Link href="/" className="flex hover:text-orange-300">
                        Notes
                    </Link>
                    <Link href="/dashboards" className="flex hover:text-orange-300">
                        Dashboards
                    </Link>
                    {user ? (
                        <Button className="flex-1 flex-row font-bold text-white hover:text-orange-300">
                        <Link href="/api/auth/logout" className="font-semibold">Log Out</Link>

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