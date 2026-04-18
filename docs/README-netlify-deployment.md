# Netlify Deployment for SWAPI Explorer

This project is deployed using Netlify, which provides continuous deployment, build, and hosting services.

---

## How It Works

- Netlify is connected to the GitHub repository.
- Every push to the main branch triggers a new build and deploy.
- Netlify automatically detects the Next.js setup and uses the correct build command and output directory.

---

## Setup Steps

1. Log in to Netlify and click "New site from Git".
2. Connect your GitHub repository.
3. Netlify will auto-detect the build settings for Next.js:
   - **Build command:** `yarn build` or `npm run build`
   - **Publish directory:** `.next`
4. Click "Deploy site".
5. Netlify will build and deploy your app on every push to main.

---

## Benefits

- Automatic deploys on every push
- Build logs and deploy previews
- Fast global CDN
- No manual configuration needed for most Next.js projects

---

## Notes

- Netlify handles deployment; GitHub Actions is used only for code quality checks (not deployment).
- You can view deploy logs and preview URLs in the Netlify dashboard.

---

## Next Steps

- Make sure your repo is connected to Netlify.
- Push to main to trigger a deploy.
- Monitor deploys and logs in the Netlify dashboard.
