# GROWTH event furniture rentals

A responsive, static website for exploring event furniture and preparing a quotation request. It uses HTML, CSS and vanilla JavaScript; no build tools, backend, database or paid API are required.

## Run locally

Open `index.html` in a browser, or serve the `growth` folder with any static file server. For example, if Python is installed:

```powershell
py -m http.server 8000
```

Run that command from this folder, then visit `http://localhost:8000`.

## Business details

- Replace the WhatsApp placeholder in `business-config.js` with your business number in international format, digits only. For example, use `15551234567`, without `+`, spaces or punctuation. The website does not enable WhatsApp until a valid number is configured.
- Update the phone, email, hours and social profile placeholders in the footer of `index.html`.
- Product prices are deliberately shown as **Price on request**. Update the product names, descriptions and categories in `script.js` as your inventory is confirmed.
- Images currently load from the Unsplash image CDN, so the visitor's browser needs an internet connection to display them. Replace the image URLs with your licensed event and inventory photography when available.
- Enquiries are prepared in WhatsApp and are not saved or submitted to a server. The visitor must review and press Send in WhatsApp. An enquiry is not a confirmed booking.

## Publish on GitHub

Create an empty GitHub repository, then run these commands from the `growth` folder (replace the URL with your repository URL):

```powershell
git init
git add .
git commit -m "Build GROWTH event rentals website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

For later updates, run `git add .`, `git commit -m "Describe your update"` and `git push`.

## Deploy on Render

1. Sign in to Render and choose **New** then **Static Site**.
2. Connect the GitHub repository containing `index.html`.
3. Set the publish directory to the repository root if `index.html` is at the root, or `growth` if this folder is inside a larger repository.
4. Leave the build command empty. No start command or environment variables are needed.
5. Choose **Create Static Site**. Render will publish the site and provide its URL.

If using this folder as a subfolder in a repository, the simplest setup is to set the Render publish directory to `growth`.