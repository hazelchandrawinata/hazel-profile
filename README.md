# Hazel Chandrawinata Personal Profile

A lightweight static personal portfolio built with HTML, CSS, and vanilla JavaScript.

## Project structure

- `index.html` — single-page profile website
- `css/style.css` — site styling and responsive layout
- `js/main.js` — navigation, reveal animations, and scroll behavior
- `assets/icons/favicon.svg` — favicon based on the HC monogram
- `assets/documents/` — place the final CV PDF here when available

## Appearance

Use the sun/moon button in the navigation to switch between light and dark themes. The
selected theme is saved in the browser; before a selection is made, the site follows the
device color preference.

## Run locally

1. Open the project folder in VS Code.
2. Start a simple local server from the workspace root:

   ```bash
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000` in the browser.
4. You can also open `index.html` directly in a browser if preferred.

## Update profile information

Edit the content directly in `index.html` to update:

- Experience details
- Education entries
- Project description
- Skills and interests
- Contact links
- Footer text

## Add the CV file

When a verified CV PDF is available, save it in the folder below:

- `assets/documents/Hazel-Chandrawinata-CV.pdf`

The navigation and hero CTA are prepared to use that file when it is available. The current implementation does not publish a fake or unverified CV.

## Publish on GitHub Pages

1. Push the project to a GitHub repository.
2. In GitHub, open the repository and go to Settings.
3. Select Pages from the left sidebar.
4. Under Source, choose the main branch and `/root` folder.
5. Save the settings.
6. GitHub Pages will provide a live URL for the site.

This website is designed as a static site and does not require a backend or paid hosting.
