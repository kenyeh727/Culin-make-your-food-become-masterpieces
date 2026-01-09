# CulinAI - Smart Chef Assistant

An AI-powered recipe generator built with React, Vite, and Google Gemini.

## 🚀 Deployment Instructions (GitHub Pages)

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### 1. Prerequisite: Set up API Key

Since the API Key is a secret, you must store it in your GitHub repository settings before the first deployment works.

1.  Go to your GitHub Repository: `https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces`
2.  Click **Settings** (top bar).
3.  In the left sidebar, scroll down to **Secrets and variables** -> **Actions**.
4.  Click **New repository secret** (green button).
5.  **Name**: `GEMINI_API_KEY`
6.  **Secret**: Paste your Gemini API Key here (starts with `AIza...`).
7.  Click **Add secret**.

### 2. Enable GitHub Pages

1.  In the same **Settings** tab.
2.  In the left sidebar, click **Pages**.
3.  Under **Build and deployment** -> **Source**, select **GitHub Actions**.
4.  (The environment should automatically be created by the action, but ensuring this setting is correct helps).

### 3. Deploy

Simply push your code to the `main` branch.

```bash
git add .
git commit -m "Update for deployment"
git push origin main
```

- Navigate to the **Actions** tab in your repository to see the deployment progress.
- Once finished, your site will be live at: [https://kenyeh727.github.io/Culin-make-your-food-become-masterpieces/](https://kenyeh727.github.io/Culin-make-your-food-become-masterpieces/)

### Local Development

To run locally:

1.  Ensure you have a `.env` file in the root directory (this file is ignored by git):
    ```env
    GEMINI_API_KEY=your_key_here
    ```
2.  Run:
    ```bash
    npm install
    npm run dev
    ```
3.  Open `http://localhost:3000`.

## Features

- **Recipe Generation**: Input ingredients and preferences to get AI-crafted recipes.
- **Image Generation**: Visualizes the final dish.
- **Chef Chat**: Ask questions to an AI chef.
- **Multi-language**: Supports English, Traditional Chinese, Simplified Chinese, and Korean.
