import {getSession} from "@auth0/nextjs-auth0";
import {User} from "@/lib/types";

export const createUser = async () => {
    const session = await getSession();
    const sessionUser = session?.user;
    if (sessionUser) {
        try {
            const user: User = {
                email: sessionUser.email,
                id: sessionUser.sub,
                name: sessionUser.nickname
            }
            const response = await fetch('http://localhost:3000/api/db/user', {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })

            return response.status == 201 || response.status == 200;

        } catch (error) {
            console.log("Failed to create User");
            return false;
        }
    }
}