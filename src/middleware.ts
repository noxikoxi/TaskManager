import {withMiddlewareAuthRequired} from "@auth0/nextjs-auth0/edge";


const middleware = withMiddlewareAuthRequired();

export default middleware;

export const config = {
  matcher: ['/api/db/dashboard/:path*', '/api/db/user/:path*', '/dashboard/:path*']
};