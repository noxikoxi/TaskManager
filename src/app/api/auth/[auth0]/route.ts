import {handleAuth, handleCallback, handleLogin, handleLogout, handleProfile} from "@auth0/nextjs-auth0";
import {NextApiRequest, NextApiResponse} from "next";
import {User} from "@/lib/types";
// const afterCallback = async (req: NextApiRequest, session: any, state: any) => {
//     const user : User = {
//         name : session.user.name,
//         id : session.user.sub,
//         email : session.user.email,
//         picture: session.user?.picture
//     }
//
//
//     return session;
// }

export const GET = handleAuth({
    login : handleLogin,
    logout: handleLogout,
    profile: handleProfile,
    callback: handleCallback,
    // callback: async (req: NextApiRequest, res: NextApiResponse) => {
    //     return await handleCallback(req, res, {afterCallback});
    // }
})