# Deployment Guide for X Clone

This guide will help you deploy your X Clone website to GitHub Pages.

## 🚀 Quick Deployment Steps

### Option 1: Deploy via GitHub Settings (Recommended)

1. **Go to your repository on GitHub**
   - Navigate to: `https://github.com/rajatkumar1011/Xclone`

2. **Open Repository Settings**
   - Click on the "Settings" tab at the top of your repository

3. **Navigate to GitHub Pages**
   - Scroll down to the "Pages" section in the left sidebar
   - Or go directly to: `https://github.com/rajatkumar1011/Xclone/settings/pages`

4. **Configure GitHub Pages**
   - Under "Source", select the branch you want to deploy (usually `main`)
   - Leave the folder as `/ (root)`
   - Click "Save"

5. **Wait for Deployment**
   - GitHub will build and deploy your site
   - This usually takes 1-2 minutes
   - You'll see a message saying "Your site is ready to be published at..."

6. **Access Your Website**
   - Your site will be available at: `https://rajatkumar1011.github.io/Xclone/`
   - You can visit this URL once the deployment is complete

### Option 2: Deploy via GitHub Actions (Advanced)

If you want automated deployments, you can set up GitHub Actions:

1. Create `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

2. Commit and push this file to your repository

## 📝 Verification

After deployment, verify your site by:

1. Opening the live URL: `https://rajatkumar1011.github.io/Xclone/`
2. Testing all features:
   - Creating a post
   - Liking/unliking posts
   - Retweeting posts
   - Responsive design on mobile

## 🔧 Troubleshooting

### Site not loading?
- Wait a few minutes after enabling GitHub Pages
- Check that the branch is correct in Settings → Pages
- Ensure `index.html` is in the root directory

### CSS/JS not loading?
- Check browser console for errors
- Ensure all file paths are relative (no leading `/`)
- Clear browser cache

### Font Awesome icons not showing?
- Check your internet connection (icons load from CDN)
- Verify the CDN link in `index.html` is accessible

## 🎉 Success!

Once deployed, your X Clone will be live and accessible to anyone with the URL!

## 📱 Sharing Your Site

Share your deployed site with:
- Direct link: `https://rajatkumar1011.github.io/Xclone/`
- QR code (generate at qr-code-generator.com)
- Social media posts

## 🔄 Future Updates

After the initial deployment:
1. Make changes to your code locally
2. Commit and push to the `main` branch
3. GitHub Pages will automatically redeploy your site
4. Changes will appear in 1-2 minutes

---

**Need Help?** Check the [GitHub Pages Documentation](https://docs.github.com/en/pages)
