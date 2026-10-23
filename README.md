# TrialQueue — Hostinger deployment artifact

This branch contains the prebuilt static site from source commit 1229ccd69cf58c50a36f93e5700e1980cb794158 on main. It requires no Node.js process or server build command.

Hostinger: create a Custom PHP/HTML website, then Dashboard → Advanced → Git.
Repository: https://github.com/PrajaktaAdlytica/trialqueue-site.git
Branch: hostinger-deploy
Deploy directory: public_html (legacy Install Path: leave blank).

Deploy to an empty website directory on first setup. Back up existing content before replacing it. The root index.html, assets folder and hidden .htaccess must be deployed together. The .htaccess supplies SPA route refreshes, prevents directory browsing and blocks dotfiles. Verify /demo and /products/trial-desk after deployment, including a browser refresh.

Connect the purchased TrialQueue domain to this website in hPanel. Use the actual DNS instructions shown for this hosting account, retaining existing mail records. Enable/verify HTTPS after DNS resolves. The domain name and account capacity have not been verified here.

## Updating the website

Edit source on main. Run npm ci, npm run typecheck, npm run build and npm run test:sites in that source checkout. Copy the contents of dist/client into a separate checkout of hostinger-deploy, keeping this .htaccess and deployment notes. Remove obsolete build assets, commit and push hostinger-deploy. Never merge this artifact branch into main.

Hostinger auto-deploy follows pushes to hostinger-deploy once connected. A push to main alone DOES NOT rebuild this branch. No cross-branch GitHub Actions workflow is configured. Do not edit compiled JavaScript directly.

Forms remain local drafts; authentication and clinical integrations are unavailable. Main and existing Vercel settings are unchanged. A connected Vercel project may attempt a preview for this new branch; this is not its production branch.
