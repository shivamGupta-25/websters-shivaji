import { NextResponse } from 'next/server';

// Simple token validation cache to avoid redundant processing
const tokenCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Admin credentials (in production, these should be in environment variables)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export function middleware(request) {
    // Check if the request is for an admin route
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Skip authentication for the login page itself
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Get the session token from cookies
        const sessionToken = request.cookies.get('admin_session')?.value;

        // If no session token is present, redirect to login
        if (!sessionToken) {
            console.log('No admin_session cookie found, redirecting to login');
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Validate the session token
        try {
            const decodedToken = Buffer.from(sessionToken, 'base64').toString();
            // Check for proper format - should have at least 3 parts after splitting by |
            const tokenParts = decodedToken.split('|');
            if (tokenParts.length < 3) {
                console.error('Invalid token format in admin session, redirecting to login');
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
            
            const [username, timestamp, randomValue] = tokenParts;
            
            // Check if the token is expired (2 hours)
            if (Date.now() - parseInt(timestamp) > 2 * 60 * 60 * 1000) {
                console.log('Admin session expired, redirecting to login');
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }

            // Check if the username matches
            if (username !== ADMIN_USERNAME) {
                console.log('Invalid username in admin session, redirecting to login');
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }

            // Session is valid, allow access
            return NextResponse.next();
        } catch (error) {
            console.error('Session validation error:', error);
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Check if the request is for a protected form submission page
    if (request.nextUrl.pathname === '/formsubmitted/workshop' || request.nextUrl.pathname === '/formsubmitted/techelons') {
        // Get the registration token from the URL
        const token = request.nextUrl.searchParams.get('token');

        // If no token is present, redirect to home
        if (!token) {
            console.warn('Access attempt without token to protected page:', request.nextUrl.pathname);
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Check if token is in cache and still valid
        const now = Date.now();
        const cachedResult = tokenCache.get(token);
        if (cachedResult && cachedResult.expires > now) {
            // Token is valid and cached, allow the request
            return NextResponse.next();
        }

        try {
            // Decode the token - this is a simple base64 decode
            const decodedToken = Buffer.from(token, 'base64').toString();
            
            // Simplified email validation regex - still comprehensive but more efficient
            const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|du\.ac\.in|ipu\.ac\.in|ignou\.ac\.in|jnu\.ac\.in|iitd\.ac\.in|nsut\.ac\.in|dtu\.ac\.in|igdtuw\.ac\.in|aud\.ac\.in|jamiahamdard\.edu|bhu\.ac\.in|bvpindia\.com|mait\.ac\.in|ip\.edu|msit\.in|gbpuat\.ac\.in)$/;
            
            // Extract email from token (handle both formats)
            let email = decodedToken;
            
            // If token has timestamp format (email|timestamp), extract just the email
            if (decodedToken.includes('|')) {
                email = decodedToken.split('|')[0];
            }
            
            // Validate the email format
            if (!emailRegex.test(email)) {
                console.warn('Invalid token format detected:', request.nextUrl.pathname);
                return NextResponse.redirect(new URL('/', request.url));
            }
            
            // Cache the valid token
            tokenCache.set(token, {
                email,
                expires: now + CACHE_TTL
            });
            
            // Clean up expired cache entries occasionally (1% chance per request)
            if (Math.random() < 0.01) {
                for (const [key, value] of tokenCache.entries()) {
                    if (value.expires <= now) {
                        tokenCache.delete(key);
                    }
                }
            }
            
            return NextResponse.next();
        } catch (error) {
            // If token is invalid, redirect to home
            console.error('Token validation error:', error);
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/formsubmitted/workshop', '/formsubmitted/techelons']
};