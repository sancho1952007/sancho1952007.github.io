# GitHub Pages Deployment Guide

## Setup Instructions

1. **Update the basePath in `next.config.mjs`:**
   - Replace `'/portfolio-website-redesign'` with your actual GitHub repository name
   - Example: If your repo is `sancho1952007/my-portfolio`, use `'/my-portfolio'`

2. **Push your code to GitHub:**
   \`\`\`bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   \`\`\`

3. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click **Settings** > **Pages**
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**
   - Save the settings

4. **Wait for deployment:**
   - The GitHub Action will automatically build and deploy your site
   - Check the **Actions** tab to monitor progress
   - Once complete, your site will be live at: `https://sancho1952007.github.io/your-repo-name/`

## Important Notes

- Make sure to update the `basePath` in `next.config.mjs` to match your repository name
- The `.nojekyll` file prevents GitHub Pages from ignoring Next.js files
- The GitHub Actions workflow automatically deploys on every push to main
- Your site will be available at: `https://[username].github.io/[repo-name]/`

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. Build the site:
   \`\`\`bash
   npm run build
   \`\`\`

2. The static files will be in the `out` folder

3. Deploy the `out` folder to the `gh-pages` branch using:
   \`\`\`bash
   npx gh-pages -d out
