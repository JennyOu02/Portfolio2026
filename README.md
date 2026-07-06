# Jenny Ou — Portfolio

Dark, neon, neo-futuristic portfolio built with **Next.js + Tailwind CSS + Framer Motion**, deployed to **GitHub Pages** as a fully static site. All content lives in editable data files and every project is presented as a company-style case study (Context → Problem → Solution → Impact).

## Editing content (no code needed)

All text, images and projects live in the `content/` folder:

```
content/
  profile.json       ← name, tagline, about, stats, contact links, CV file
  experience.json    ← work history
  education.json     ← schools & degrees
  skills.json        ← skill icons + chips
  extras.json        ← beyond-work activities
  projects/*.md      ← one case study per project
```

### The easy way — Pages CMS (admin dashboard)

1. Go to **[app.pagescms.org](https://app.pagescms.org)** and sign in with your GitHub account.
2. Open this repository — the editing forms are already configured via `.pages.yml`.
3. Edit any section, upload images, add projects. Every save commits to `main` and the site republishes automatically in ~1 minute.

### Adding a new project

In Pages CMS choose **Projects (Case Studies) → Add entry**, or copy any file in `content/projects/` and edit it. The case-study format keeps every project professional:

- **Context** — the situation
- **Problem** — the pain point and stakes
- **Solution** — what you built (bullets)
- **Impact** — measurable results (metric + label)
- Plus cover image, gallery, tags and links.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static site and deploys it to GitHub Pages.

**One-time setup:** in the repo settings → *Pages*, set **Source** to **GitHub Actions**.

The site is served at `https://jennyou02.github.io/Portfolio2026/`. If you ever move it to a custom domain or a different repo name, update `NEXT_PUBLIC_BASE_PATH` in `.github/workflows/deploy.yml` (set it to `''` for a root domain).

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```
