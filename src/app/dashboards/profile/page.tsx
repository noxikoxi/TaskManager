'use client'
import {useUser} from "@auth0/nextjs-auth0/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function Home() {
    const {user} = useUser();

    return (
        <div className="flex flex-row flex-1 w-full">
            <div className="container flex flex-col md:flex-row gap-2 md:gap-5 items-center">
            {user?.picture && (
            <Avatar>
                <AvatarImage src={user.picture}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            )}
            <span className="text-black">
                <span className="font-semibold">Email: </span>
                {user?.email}
            </span>
            <span className="text-black">
                <span className="font-semibold">Name: </span>
                {user?.name}
            </span>
            </div>


        </div>
    )
}
