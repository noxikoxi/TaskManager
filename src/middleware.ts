import {withMiddlewareAuthRequired} from "@auth0/nextjs-auth0/edge";
import {NextResponse} from "next/server";


const middleware = withMiddlewareAuthRequired(async (req) => {
  console.log('Middleware executed for request:', req.nextUrl.pathname);
  return NextResponse.next();
});

export default middleware;

export const config = {
  matcher: ['/api/db/:path*']
};