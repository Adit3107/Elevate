import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Only protect the register routes - all other routes are public (static data)
const isProtectedRoute = createRouteMatcher([
  "/register(.*)",
  "/profile(.*)"
]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    const signInUrl = new URL("/sign-in", request.url);
    await auth.protect({
      unauthenticatedUrl: signInUrl.toString(),
      unauthorizedUrl: signInUrl.toString()
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
