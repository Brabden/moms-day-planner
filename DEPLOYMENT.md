# Deployment Instructions for Mom's Day Planner

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Using Vercel CLI:
1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```
   Follow the prompts. It will ask:
   - Set up and deploy? Yes
   - Which scope? (choose your account)
   - Link to existing project? No
   - Project name? moms-day-planner (or any name)
   - Directory? ./dist
   - Override settings? No

4. Your app will be deployed and you'll get a URL like: `https://moms-day-planner.vercel.app`

### Using Vercel Dashboard (Alternative):
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository (or drag and drop the `dist` folder)
5. Set framework preset to "Vite"
6. Build command: `npm run build`
7. Output directory: `dist`
8. Click "Deploy"

## Option 2: Deploy to Netlify

1. Go to https://app.netlify.com
2. Sign up/Login
3. Drag and drop the `dist` folder directly onto the Netlify dashboard
4. Your app will be live immediately with a URL like: `https://random-name-123.netlify.app`

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

## Option 3: Deploy to GitHub Pages

1. Create a GitHub repository
2. Push your code
3. Install gh-pages: `npm install --save-dev gh-pages`
4. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
5. Run: `npm run deploy`

## Sharing the App

Once deployed, share the URL with your mom. The app will:
- Work in any modern web browser
- Save all data locally in the browser (no account needed)
- Be accessible from any device with internet

## Important Notes

- All data is stored locally in the browser (localStorage)
- No backend/server required
- Works offline after first load
- Data is specific to each browser/device

