# Mehrdad Ashtiani — Academic Website

Academic website for **Dr. Mehrdad Ashtiani** at the **School of Computer Engineering, Iran University of Science and Technology (IUST)**. The site brings together his research, publications, teaching, supervision, academic profile, and the DINA Lab community.

Built with **HTML, CSS, and vanilla JavaScript**. No package installation or build step is required.

[Repository](https://github.com/DINA-Lab-IUST/Mehrdad-Ashtiani) · [DINA Lab on GitHub](https://github.com/DINA-Lab-IUST) · [IUST Profile](https://its.iust.ac.ir/profile/en/m_ashtiani) · [MIT License](LICENSE)

## Features

- Responsive layouts with desktop and mobile navigation.
- Light and dark themes, with the selected theme saved locally.
- Searchable publications with type and year filters, sorting, expandable details, and publication links.
- Search and filters for teaching and supervision archives.
- Dedicated pages for research, DINA Lab, biography, and academic contact information.
- Keyboard controls, visible focus styles, skip links, and scroll reveal effects.

## Pages

| Page | File | Content |
| --- | --- | --- |
| Home | [index.html](index.html) | Profile overview, research directions, and selected publications |
| DINA Lab | [dina-lab.html](dina-lab.html) | Distributed Infrastructure for NextGen Applications: research, people, and lab activity |
| Research | [research.html](research.html) | Research directions and academic and industrial projects |
| Publications | [publications.html](publications.html) | Searchable publication archive and featured work |
| Teaching | [teaching.html](teaching.html) | Course records, teaching assistants, and historical teaching archive |
| Supervision | [supervision.html](supervision.html) | Student supervision, outcomes, and searchable records |
| About | [about.html](about.html) | Biography, education, recognition, and academic service |
| Contact | [contact.html](contact.html) | University contact details, location, and academic profiles |

## Run locally

Use Git to clone the repository and Python 3 to serve its root directory:

```bash
git clone https://github.com/DINA-Lab-IUST/Mehrdad-Ashtiani.git
cd Mehrdad-Ashtiani
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in a modern browser. Stop the server with `Ctrl+C`.

If your system provides Python 3 as `python`, use `python -m http.server 8000 --bind 127.0.0.1` instead.

JavaScript powers the publication archive, search, filters, and theme controls. External resources, including the embedded map and linked publication pages, require an internet connection.

## Project structure

| Location | Purpose |
| --- | --- |
| Root `*.html` files | Page markup and most academic content |
| `assets/style.css` | Shared layout, theme variables, typography, and components |
| `assets/site.js` | Theme switching, mobile navigation, scroll reveals, and back-to-top controls |
| `assets/publications-data.js` | Publication records exposed as `window.PUBLICATIONS` |
| `assets/publications.js` | Publication rendering, search, filtering, and sorting |
| `assets/teaching.js`, `assets/supervision.js` | Teaching and supervision archive interactions |
| Other `assets/*.css` files | Styles for individual pages |
| `assets/brand/` | Static and animated SVG identity assets |
| `assets/people/` | Lab member portraits and illustrations |
| `assets/mehrdad-ashtiani.jpg` | Faculty portrait |

## Update content

Edit the files directly, then refresh the local preview.

| Change | Where to edit |
| --- | --- |
| Publication archive | Objects in `window.PUBLICATIONS` inside `assets/publications-data.js` |
| Homepage highlights | `index.html`; these are maintained separately from the publication archive |
| Research and projects | `research.html` |
| Lab members and lab activity | `dina-lab.html`; update `supervision.html` where the same people appear |
| Courses and teaching assistants | `teaching.html` |
| Supervision records | `supervision.html` |
| Biography, education, and service | `about.html` |
| Contact information and profile links | `contact.html` and any repeated details in other pages |
| Colors and shared appearance | CSS custom properties and rules in `assets/style.css` |

Keep `assets/publications-data.js` loaded before `assets/publications.js` in `publications.html`. Publication data is maintained in the repository; it is not automatically synchronized with Google Scholar or university profiles.

Navigation, headers, and footers are repeated across the HTML pages. Apply shared changes consistently and preserve relative asset paths so the site also works when hosted under a repository subpath.

For academic updates, retain source links and dates. Keep historical records clearly dated, and verify new publication metadata against the publisher, DOI record, or author-provided source.

## Deployment

Serve the repository root with any static web host; no build command is needed. Keep the HTML files and `assets/` directory together.

To publish with GitHub Pages:

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select **main** and **/(root)**, then save.
4. Use the site URL shown by GitHub after deployment completes.

See the [GitHub Pages publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for details.

## Contributing

Issues and pull requests are welcome for content corrections, bug fixes, and accessibility improvements. For academic content changes, include a supporting source link.

Before submitting, preview the affected pages at desktop and mobile widths, check both themes, and check any links or interactive controls affected by the change.

## Contact

- **Academic correspondence:** [m_ashtiani@iust.ac.ir](mailto:m_ashtiani@iust.ac.ir)
- **University profile:** [Mehrdad Ashtiani at IUST](https://its.iust.ac.ir/profile/en/m_ashtiani)
- **Website issues:** [GitHub Issues](https://github.com/DINA-Lab-IUST/Mehrdad-Ashtiani/issues)

## License

Distributed under the [MIT License](LICENSE).

Copyright (c) 2026 Mehrdad Ashtiani.
