---
title: "Deploying Docusaurus on Cloudflare Pages"
description: "A complete guide from GitHub to a live Cloudflare Pages deployment."
---

# Deploying Docusaurus to Cloudflare Pages

Cloudflare Pages is one of the fastest and easiest ways to host a static website like Docusaurus. It's completely free for most personal and small projects, offers lightning-fast global CDN delivery, and provides automatic continuous deployment from GitHub.

In this tutorial, we will deploy this exact Docusaurus project to Cloudflare Pages!

---

## Step 1: Push your code to GitHub

Before Cloudflare can deploy your site, it needs to read your code from a Git repository. 

1. **Initialize Git (If you haven't already):**
   Open your terminal in your project directory and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Docusaurus project"
   ```

2. **Create a GitHub Repository:**
   Go to [GitHub](https://github.com/), create a new repository (public or private), and do not initialize it with a README.

3. **Push your code:**
   Link your local project to GitHub and push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

---

## Step 2: Set up Cloudflare Pages

1. **Log into Cloudflare:**
   Head over to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and create a free account if you don't have one.

2. **Navigate to Pages:**
   In the left sidebar, click on **Workers & Pages**. Then, click the blue **Create application** button, and select the **Pages** tab.

3. **Connect GitHub:**
   Click on **Connect to Git**. Cloudflare will ask for permission to access your GitHub repositories. Choose either "All repositories" or specifically select the Docusaurus repository you just created.

4. **Select your Repository:**
   Once authorized, you will see a list of your repositories. Select your Docusaurus project and click **Begin setup**.

---

## Step 3: Configure Build Settings

This is the most important step. Cloudflare needs to know *how* to build your Docusaurus site and *where* to find the finished HTML files.

In the **Set up builds and deployments** screen, fill out the following settings:

* **Project name:** (You can leave this as the default or name it anything you like. This will become your `.pages.dev` subdomain).
* **Production branch:** `main` (or `master` depending on what you pushed).
* **Framework preset:** Select `None` (or `Create React App` doesn't matter, we will configure it manually).
* **Build command:** `npm run build`
* **Build output directory:** `build`

> [!IMPORTANT]
> Docusaurus automatically places all compiled static HTML, CSS, and JS files into a folder named `build`. If you get the output directory wrong, Cloudflare will deploy an empty site or fail the build!

### Environment Variables (Important for Node versions)
Docusaurus v3 requires Node.js 18.0 or newer. To ensure Cloudflare Pages uses a modern version of Node.js:
1. Under **Environment variables (advanced)**, click **Add variable**.
2. **Variable name:** `NODE_VERSION`
3. **Value:** `20` (or `18.17.0`)

---

## Step 4: Save and Deploy!

Click the **Save and Deploy** button! 

Cloudflare will now spin up a build environment, pull your code from GitHub, run `npm run build`, and deploy the contents of the `build` folder to their global network.

### What happens next?
* **Continuous Deployment:** Every time you push new markdown files or code changes to the `main` branch on GitHub, Cloudflare will automatically trigger a new build and update your live website within minutes.
* **Custom Domains:** Once your site is live on the `.pages.dev` subdomain, you can easily attach your own custom domain (e.g., `hashcode-learn.com`) from the Cloudflare Pages settings dashboard.

Congratulations! Your site is now live on the edge!
