# Work Journal

4/7/25

Steps Completed Today
Set Up Google OAuth:

Configured Google Cloud Console with OAuth credentials.
Added GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI to the .env file.
Implemented /api/auth/google/login and /api/auth/google/callback endpoints.
Successfully authenticated with Google and retrieved access_token and refresh_token.
Tested OAuth Flow:

Added yourself as a tester in the Google Cloud Console.
Verified that the login and callback endpoints work as expected.
Retrieved tokens and confirmed the response.
Updated Prisma Schema:

Added a UserTokens model to store accessToken, refreshToken, and expiryDate for each user.