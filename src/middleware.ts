// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// next-auth raper of  middleware function
export default withAuth(
  // `withAuth` add the user's token to your `Request` object that you get in middleware function.
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname)
    // console.log(request.nextauth.token) // now request obj have the token

    //only admin can access the extra page
    if (
      request.nextUrl.pathname.startsWith("/extra") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
      //rewrite funciton use to redirect to "denied" page, but the url remain same(/extra)
    }

    // only admin or manager can access client page
    if (
      request.nextUrl.pathname.startsWith("/client") &&
      request.nextauth.token?.role !== "admin" &&
      request.nextauth.token?.role !== "manager"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    //the middleware function will only execute if the authorized is true
    callbacks: {
      authorized: ({ token }) => !!token, // if there is a token then the request is authorised, you can use any logic that return true or false
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/extra", "/client", "/dashboard"] }; // dashboard is added as example
