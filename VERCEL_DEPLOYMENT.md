# Next Star Soccer - Vercel Deployment Guide

## ⚠️ Important: Environment Variables Setup

The black screen issue on Vercel is caused by **missing environment variables**. Your `.env` file is not deployed to Vercel for security reasons.

### Steps to Fix:

1. **Go to your Vercel project dashboard**
   - Visit: https://vercel.com/your-username/nss-web/settings/environment-variables

2. **Add ALL environment variables from your `.env` file:**

   Copy these from your local `.env` file and add them one by one:

   ```
   VITE_APPWRITE_ENDPOINT
   VITE_APPWRITE_PROJECT_ID
   VITE_APPWRITE_DATABASE_ID
   VITE_APPWRITE_PARENT_USERS_COLLECTION_ID
   VITE_APPWRITE_YOUTH_PLAYERS_COLLECTION_ID
   VITE_APPWRITE_COLLEGIATE_PLAYERS_COLLECTION_ID
   VITE_APPWRITE_PROFESSIONAL_PLAYERS_COLLECTION_ID
   VITE_APPWRITE_COACHES_COLLECTION_ID
   VITE_APPWRITE_TEAM_TRAINING_COLLECTION_ID
   VITE_APPWRITE_SIGNUPS_COLLECTION_ID
   VITE_APPWRITE_CHECKINS_COLLECTION_ID
   VITE_APPWRITE_COACH_SIGNUPS_COLLECTION_ID
   VITE_APPWRITE_COACH_CHECKINS_COLLECTION_ID
   VITE_APPWRITE_MESSAGES_COLLECTION_ID
   VITE_APPWRITE_BILLS_COLLECTION_ID
   VITE_APPWRITE_BILL_ITEMS_COLLECTION_ID
   VITE_APPWRITE_PAYMENTS_COLLECTION_ID
   VITE_APPWRITE_FAMILY_RELATIONSHIPS_COLLECTION_ID
   VITE_APPWRITE_FAMILY_INVITATIONS_COLLECTION_ID
   VITE_STRIPE_PUBLISHABLE_KEY
   ```

3. **Select environments:**
   - Check: Production, Preview, and Development

4. **Save and Redeploy:**
   - After adding all variables, go to the "Deployments" tab
   - Click the three dots (...) on your latest deployment
   - Select "Redeploy"

### Alternative: Quick Script to Copy Variables

You can use this command to see all your environment variables:

```bash
cat .env
```

## 🔍 Debugging

After redeployment, open your browser console on the Vercel URL to see:
- Environment variable status (✅ or ❌)
- Appwrite initialization logs
- Any error messages

## 📋 Build Settings (Already Configured)

Your `vercel.json` is already set up correctly:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

This ensures React Router works properly on Vercel.

## 🚀 Local Development

```bash
npm install
npm run dev
```

## 📦 Build Locally to Test

```bash
npm run build
npm run preview
```

This will show you if there are any build errors before deploying.

---

**Note:** The `.env` file is gitignored for security. Never commit it to your repository. Always use Vercel's environment variables dashboard for deployment.
