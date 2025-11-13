# animalphysiologie.github.io
# Animalphysiologie — Website (GitHub Pages)

Static, responsive lab website with sections for Research, Publications, People, News, Openings, and Contact.

## Local preview
Use a local server so publications.json can be fetched:
- Python: python3 -m http.server 8000
- Node: npx serve .

## Customize
- Site title, text, links: index.html
- Colors/typography: styles.css (:root variables)
- Publications: publications.json (add entries; fields: title, authors, venue, year, type, url, extra)
- Images: assets/ (hero.jpg, pi.jpg, person*.jpg, favicon.ico, og-image.jpg)

## Deploy
- Push to main triggers GitHub Pages via the provided workflow.
- Or Settings > Pages > Deploy from branch (main / root).

## Custom domain
- Settings > Pages > Custom domain (add CNAME)
- Add a CNAME file in repo root if desired.
