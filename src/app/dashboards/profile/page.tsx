'use client'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import UserProfileForm from "@/components/forms/UserProfileForm";
import {useGetCurrentUser, useUpdateUser} from "@/lib/client/UserHooks";
import {useContext, useEffect} from "react";
import {SideNavContext} from "@/lib/Context/SideNavContext";
import user_bg from "../../../../public/user_bg5.svg";
import Image from "next/image";
import { withPageAuthRequired} from "@auth0/nextjs-auth0/client";
import {CircleUserRound} from "lucide-react";


export default withPageAuthRequired(function Home() {

    const {user, isLoading: getIsLoading} = useGetCurrentUser();

    const {updateUser, isLoading: updateIsLoading} = useUpdateUser();
    const {changeActive} = useContext(SideNavContext);

    useEffect(() => {
        changeActive("Profile")
    }, []);

    if(getIsLoading){
        return <span>Loading...</span>
    }

    if(!user){
        return <span>Unable to load user profile</span>
    }

    const fallBack = () => {
        if(user.firstName && user.lastName){
            return user.firstName[0] + user.lastName[0];
        }else{
            return <CircleUserRound size={40} />;
        }
    }

    return (
        <div className="w-full bg-accent h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full p-10 gap-10">
                <div className="bg-background border-b-2 rounded relative lg:col-span-1 col-span-3">
                    <div className="absolute top-0 h-2/5">
                        <Image src={user_bg} alt="Profile Backgorund"  className="rounded object-cover h-full" />
                    </div>
                    <div className="flex flex-col items-center mt-20 border-2 border-b-0 ">
                        <Avatar className="w-[100px] h-[100px]">
                            <AvatarImage src={user.picture}/>
                            <AvatarFallback className="bg-accent">
                                {fallBack()}
                            </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-xl">{user.firstName || "First Name"} {user.lastName || "Last Name"}</span>
                        <span className="text-accent">@{user.username || "username"}</span>
                        <pre>&quot;{user.aboutMe || "About Me"}&quot;</pre>
                    </div>
                </div>
                <div className="col-span-3 lg:col-span-2 row-span-3">
                    <UserProfileForm  currentUser={user} isLoading={updateIsLoading} onSave={updateUser}/>
                </div>
            </div>
        </div>
    )
});
