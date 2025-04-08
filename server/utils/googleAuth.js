import { OAuth2Client } from "google-auth-library";h-library";

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
  process.env.GOOGLE_CLIENT_SECRET, // Your Google Client Secret
  process.env.GOOGLE_REDIRECT_URI // Redirect URI (e.g., http://localhost:3000/api/auth/google/callback)/callback)
);

// Generate an authentication URL
const getAuthUrl = () => {
  const scopes = ["https://www.googleapis.com/auth/calendar"];
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
};

// Exchange authorization code for tokens
const getTokens = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

export { oauth2Client, getAuthUrl, getTokens };