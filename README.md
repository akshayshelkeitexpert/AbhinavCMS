# Constructo – Angular (project/5)

This is the **Constructo** Bootstrap template from project/4 (folder 4) converted into an **Angular 21** app. All pages and assets are included; content is unchanged and ready for you to replace.

## Structure

- **Template source:** `../4/Constructo/` (HTML, CSS, JS, images)
- **Assets:** `src/assets/` (css, vendor, img from the template)
- **Layout:** `src/app/components/header/`, `src/app/components/footer/`
- **Pages:** `src/app/pages/` (home, about, services, projects, team, contact, quote, terms, privacy, service-details, project-details, starter-page, not-found)

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/projects` | Projects |
| `/team` | Team |
| `/contact` | Contact |
| `/quote` | Quote form |
| `/terms` | Terms |
| `/privacy` | Privacy |
| `/service-details` | Service details |
| `/project-details` | Project details |
| `/starter-page` | Starter page |
| `/404` | 404 (also used for unknown routes) |

## Run / build

- **Node:** Angular 21 expects Node **v20.19+** or **v22.12+**. If you see a Node version error, upgrade Node (e.g. to v22.12+) or use the same Node version as in project/2.
- **Install:** `npm install`
- **Serve:** `npm start` or `ng serve` → http://localhost:4200
- **Build:** `ng build`

## Content

All page content is the original template text. Replace copy and images as needed in:

- `src/app/pages/*/` – one folder per page with `.component.html` and `.component.ts`
- `src/app/components/header/` and `footer/` – nav and footer text/links
- `src/assets/img/` – images (construction, person, etc.)

## Template scripts

Bootstrap, AOS, Swiper, and GLightbox are loaded from `src/index.html`. AOS and GLightbox are initialized on load; Swiper is initialized with a short delay so the home testimonials slider works after the app has rendered.
