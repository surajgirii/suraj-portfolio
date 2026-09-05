# Suraj Giri — Data Analyst Portfolio

A personal portfolio site built with React, Vite, and Tailwind CSS.

## Run it locally

You'll need [Node.js](https://nodejs.org) (version 18 or later) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`) in your browser.

## Build for production

```bash
npm run build
```

This creates a `dist/` folder with the finished, optimized site — this is what
you'd upload to any static host.

To preview that production build locally before deploying:

```bash
npm run preview
```

## Project structure

```
├── index.html          # page shell, fonts, SEO meta tags
├── public/
│   └── resume.pdf       # your downloadable resume — replace this file to update it
├── src/
│   ├── assets/
│   │   └── headshot.jpg # your profile photo
│   ├── App.jsx           # the entire site (data + components)
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind imports
├── tailwind.config.js
├── vite.config.js
└── package.json
```

Nearly everything you'd want to edit — your bio, projects, certifications,
skills, contact info — lives in the `DATA` section near the top of
`src/App.jsx`, as plain JavaScript objects and arrays. You shouldn't need to
touch the component code below it just to update your content.

To swap your resume, replace `public/resume.pdf` with a new file of the same
name. To swap your photo, replace `src/assets/headshot.jpg`.

## Publishing to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/surajgirii/YOUR-REPO-NAME.git
git push -u origin main
```

## Deploying the live site

**Easiest option — Vercel or Netlify:**
Sign in with GitHub, import the repository, and both will detect the Vite
project automatically (build command `npm run build`, output directory
`dist`). No config needed. Every push to `main` redeploys automatically.

**GitHub Pages:**
1. Install the deploy helper: `npm install -D gh-pages`
2. In `vite.config.js`, change `base: "/"` to `base: "/YOUR-REPO-NAME/"`
3. Add to `package.json` scripts: `"deploy": "vite build && gh-pages -d dist"`
4. Run `npm run deploy`
5. In your repo's Settings → Pages, set the source to the `gh-pages` branch

Your site will then be live at `https://surajgirii.github.io/YOUR-REPO-NAME/`.

## Notes

- The contact form opens the visitor's email app with a message pre-addressed
  to you — it doesn't require a backend. If you'd rather have it submit
  silently, connect a service like Formspree or EmailJS and update the
  `handleSubmit` function in `ContactSection` inside `src/App.jsx`.
- The custom cursor and background grid automatically turn off on touch
  devices and respect the "reduce motion" accessibility setting.
