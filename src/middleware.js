import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const protectedRoutes = ["/cart", "/checkout"];

    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/cart', '/checkout'],
};

