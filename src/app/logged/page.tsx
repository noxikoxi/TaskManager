import {createUser} from "@/lib/actions";
import {redirect} from "next/navigation";
export default async function Home() {

    if(await createUser())
    {
        redirect("/dashboard/notebooks");
    }else{
        redirect("/api/auth/logout");
    }
}