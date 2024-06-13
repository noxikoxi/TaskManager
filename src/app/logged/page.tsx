import {createUser} from "@/lib/actions";
import {redirect} from "next/navigation";
export default async function Home() {

    if(await createUser())
    {
        redirect("/dashboards");
    }else{
        redirect("/api/auth/logout");
    }
}