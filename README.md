# Paragon Premiere Residential Maintenance — Website

Static marketing site for Paragon Premiere, the residential maintenance sister
company to [Paragon Custom Homes](https://paragonhomesutah.com/). Plain
HTML/CSS/JS — no build step, no framework, no dependencies.

## Structure

```
index.html            Home
services.html          Add-on catalog & project services
membership.html         5-tier membership model (Access / Annual Care /
                        Seasonal Care / Complete Care / Private Home Management)
about.html              Company story, leadership, Home Passport
service-areas.html      Salt Lake, Summit, Utah & Wasatch counties
testimonials.html       Client testimonials (placeholder copy — see below)
contact.html            Contact form + concierge info

css/styles.css          Full design system (tokens, type, components)
js/main.js              Mobile nav, FAQ accordion, footer year, tier
                        pre-select on contact form
images/                 Logo lockups, P-mark symbol, favicon, team photo
```

## Previewing locally

No build step required. Either:

- Open `index.html` directly in a browser, or
- Run a local server from this folder so relative paths behave exactly like
  production, e.g. `python3 -m http.server 8000` then visit
  `http://localhost:8000`.

## Deploying

This is plain static HTML/CSS/JS, so it will run as-is on GitHub Pages,
Netlify, Vercel, S3/CloudFront, or any static host. For GitHub Pages:
push this folder to a repo, then enable Pages on the `main` branch
(root directory).

## Design system

- **Brand colors** (from the Paragon Custom Homes brand guide): Mineshaft
  Black `#303030`, Desert Storm `#F1F1EE`, Bitter Gold `#8A8C79`, Buff
  Yellow `#F4D185`. All defined as CSS custom properties at the top of
  `css/styles.css` — change them there to restyle the whole site.
- **Type**: Fraunces (display/headlines), Work Sans (body), IBM Plex Mono
  (labels, prices, data). Loaded from Google Fonts via `<link>` tags in each
  page's `<head>` — swap for self-hosted fonts if you'd rather not depend on
  the Google Fonts CDN.
- **Logo**: `images/logo_premiere_horizontal_light.png` (dark text, for
  light backgrounds) and `logo_premiere_horizontal_dark.png` (light text,
  for dark backgrounds) were composited from the real Paragon Custom Homes
  P-mark. `symbol_light.png` / `symbol_dark.png` are the mark alone. These
  are a first pass, not final production logo files — see checklist below.

## Before this goes live — replace these placeholders

- [ ] **Logo** — the current lockups are a programmatic composite (real
      P-mark + a system font standing in for the wordmark). Swap in real
      vector logo files from your designer if you want the wordmark to
      exactly match Paragon Custom Homes' typeface.
- [ ] **Cameron Monahan's photo** — About page still has a placeholder
      avatar for Cameron; Brandon Jensen's is in.
- [ ] **Contact info** — phone `(801) 590-2214` and email
      `care@paragonpremiereutah.com` are placeholders used throughout the
      header, footer, and contact page.
- [ ] **Testimonials** — every quote on the Home and Testimonials pages is
      placeholder copy, flagged inline with a note. Replace with real
      client reviews (with permission) before publishing.
- [ ] **Pricing** — the 5 membership tiers use the preliminary ranges from
      the strategy doc (e.g. Complete Care "$2,000–3,500/yr"). These are
      explicitly not final — confirm real numbers once the labor-cost model
      is built.
- [ ] **Hero / team background images** — several sections use styled
      placeholder blocks (gradient fills with a label) instead of real
      photography.
- [ ] **Contact form** — front-end only right now (shows a confirmation
      message on submit but doesn't send anywhere). Wire it to a form
      backend (Formspree, Netlify Forms, a serverless function, your CRM,
      etc.) before launch.
- [ ] **Contractor license number** — intentionally omitted rather than
      invented. Add your real UT license number to the footer/header once
      you have it.

## Content source

Membership tiers, billing philosophy, seasonal checklists, the Home Health
Report, and the Private Home Management concierge actions are all pulled
from the "Property concierge service — Luxury Property Concierge Model"
strategy document. `TIERS` and the sample inspection matrix live near the
top of the (no-longer-included) build script that generated this site —
ask Claude to regenerate from source if you want to edit copy
programmatically rather than by hand in the HTML.
