import {handleAuth, handleCallback, handleLogin, handleLogout, handleProfile} from "@auth0/nextjs-auth0";


export const GET = handleAuth({
    login : handleLogin(
        {
            returnTo: "/dashboards",
        }),
    logout: handleLogout,
    profile: handleProfile,
    callback: handleCallback,
})