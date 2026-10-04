# Portfolio Site — Carlos J. Felix Velez

A single-page static portfolio highlighting automation & robotics manufacturing engineering work. Built with plain HTML, CSS, and vanilla JS. Hosted on GitHub Pages.

## Structure

```
portfolio-site/
├── index.html        # All page sections (hero, about, skills, experience, projects, education, contact)
├── styles.css        # Styling, responsive layout, timeline, gallery, lightbox
├── script.js         # Nav, scroll reveal, active-link spy, gallery lightbox
├── assets/
│   └── projects/     # Project screenshots, GIFs, and video clips for the gallery
├── .nojekyll         # Tells GitHub Pages to serve files as-is
└── README.md
```

## Local preview

Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How to add project media (gallery)

The **Projects** section is a responsive grid of cards. Three placeholder cards ship by default — replace them with real media.

1. Add your file to `assets/projects/` (e.g. `assembly-cell.webp`, `vision-demo.mp4`, `layup.gif`).
2. In `index.html`, inside the `<div class="gallery">`, copy one of the templates (see the comment block there) and update the `src`, title, and caption.

**Image / GIF card:**
```html
<figure class="gallery__card" data-caption="Your caption">
  <img src="assets/projects/your-image.webp" alt="Describe the project" loading="lazy" />
  <figcaption><strong>Project Title</strong><span>Short description</span></figcaption>
</figure>
```

**Looping silent video card:**
```html
<figure class="gallery__card" data-caption="Your caption">
  <video src="assets/projects/your-clip.mp4" autoplay muted loop playsinline></video>
  <figcaption><strong>Project Title</strong><span>Short description</span></figcaption>
</figure>
```

**Embedded YouTube/Vimeo (for large/long videos):**
```html
<figure class="gallery__card gallery__card--embed">
  <div class="embed">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Project" allowfullscreen loading="lazy"></iframe>
  </div>
  <figcaption><strong>Project Title</strong><span>Short description</span></figcaption>
</figure>
```

Clicking an image or self-hosted video card opens it in a lightbox. Placeholder and embed cards do not.

## Media size guidelines (GitHub Pages limits)

- Each file must be **under 100 MB** (hard Git limit).
- Keep the published site under ~1 GB and mind the ~100 GB/month soft bandwidth limit.
- Optimize images (prefer `.webp` or compressed `.png`), keep GIFs small, and keep self-hosted clips short.
- For large or long videos, **embed from YouTube/Vimeo** instead of self-hosting.

## Deploy (GitHub Pages)

1. Commit and push to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Deploy from a branch**, select `main` / `/ (root)`.
3. Site goes live at `https://<username>.github.io/portfolio-site/`.

Updating later: edit files → `git commit` → `git push`; Pages redeploys automatically.
