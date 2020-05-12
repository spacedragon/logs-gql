export const config = {
    appId: process.env.NEXT_PUBLIC_APP_ID,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
    authority_id: process.env.NEXT_PUBLIC_AUTHORITY_ID,
    scopes: [
      'user.read'
    ]
};