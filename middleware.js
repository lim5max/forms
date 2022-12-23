import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
export function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/')) {
        const response = NextResponse.next()
        response.cookies.set('vercel', 'fast')
        return response
    }
}