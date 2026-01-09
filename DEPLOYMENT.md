# Deployment Instructions

Your project is ready to be deployed! Since this is a React + Vite application, the easiest way to deploy it is via **Vercel** or **Netlify**.

Both platforms are free for personal use and support continuous deployment from GitHub.

## Prerequisites

1.  **GitHub Account**: Ensure your code is pushed to a repository on GitHub.
2.  **Gemini API Key**: You will need your API key ready to copy-paste.

---

## Option 1: Deploy to Vercel (Recommended)

1.  Go to [Vercel.com](https://vercel.com) and log in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  In the **Configure Project** screen:
    *   **Framework Preset**: Select `Vite` (it usually detects this automatically).
    *   **Root Directory**: Leave as `./` (default).
    *   **Environment Variables**:
        *   Click the dropdown to expand.
        *   Add a new variable:
            *   **Name**: `GEMINI_API_KEY`
            *   **Value**: `your_actual_api_key_starts_with_AIza...`
5.  Click **Deploy**.

Vercel will build your project. Once finished, you will get a public URL (e.g., `your-project.vercel.app`).

---

## Option 2: Deploy to Netlify

1.  Go to [Netlify.com](https://netlify.com) and log in.
2.  Click **"Add new site"** -> **"Import from an existing project"**.
3.  Connect to **GitHub** and select your repository.
4.  In the **Site settings**:
    *   **Build command**: `npm run build` (or `vite build`)
    *   **Publish directory**: `dist`
5.  Click **"Show advanced"** (or "Environment variables").
6.  Click **"New variable"**.
    *   **Key**: `GEMINI_API_KEY`
    *   **Value**: `your_actual_api_key_starts_with_AIza...`
7.  Click **Deploy site**.

---

## Troubleshooting

*   **"API Key not found" error**: This usually means the environment variable wasn't set correctly *during the build*. If you added the key *after* the deployment started, you must trigger a **Redeploy** (Build) for it to take effect.
*   **White screen**: Check the browser console (F12). If you see "404 for index.js", ensure your `base` path in `vite.config.ts` is correct (usually `./` or just `/`).
