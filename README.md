# Samuniverse website

A fast, dependency-free portfolio site (plain HTML, CSS and JavaScript). No build step — upload the folder and it works on GitHub Pages, Vercel and Netlify.

```
index.html        the page
css/style.css     all styling
js/config.js      ← YOUR CONTENT: email, videos, reels (edit this one)
js/main.js        behaviour (animations, player, form)
assets/           favicon + social share image
404.html          "page not found" page
.nojekyll         tells GitHub Pages to serve files as-is
```

## 1. Make it yours (5 minutes) — edit `js/config.js`

1. **Email** – replace `hello@samuniverse.in` with your real address.
2. **WhatsApp** – add your number with country code, digits only, e.g. `"919876543210"`.
3. **Portfolio videos** – for each video, paste the YouTube ID:
   `https://www.youtube.com/watch?v=AbC123xYz00` → `youtubeId: "AbC123xYz00"`
   (for Shorts: `youtube.com/shorts/AbC123xYz00` → same thing). Change titles, `category` (`business`, `education`, `shorts`) and `length`. Add or remove entries freely.
   Use `size: "wide"` for your best piece and `size: "tall"` for a vertical reel.
4. **Instagram reels** – paste up to 3 reel links into `reels: [ ]`. They'll embed directly on the page.
5. **Contact form (optional but recommended)** – sign up free at formspree.io, create a form, and paste its URL into `formEndpoint`. Messages then land in your inbox. Without it, the form opens the visitor's email app with the message filled in.

The YouTube "latest uploads" player already works automatically from your channel ID.

## 2. Publish on GitHub Pages

1. Create a free account at github.com → **New repository** → name it `samuniverse` (Public).
2. **Add file → Upload files** → drag in everything inside this folder (including `.nojekyll`) → **Commit**.
3. Repo **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` / `(root)` → **Save**.
4. After ~1 minute your site is live at `https://YOUR-USERNAME.github.io/samuniverse/`.

To update later: edit `js/config.js` on GitHub (pencil icon) and commit — it redeploys automatically.

## 3. Vercel or Netlify (same repo)

- **Vercel**: vercel.com → Add New → Project → import the GitHub repo → Framework preset **Other** → Deploy. Leave build command empty.
- **Netlify**: app.netlify.com → Add new site → Import from Git → pick the repo → leave build command empty, publish directory `/` → Deploy. (Or just drag the folder onto app.netlify.com/drop.)

Both auto-redeploy every time you commit to GitHub.

## 4. Custom domain (e.g. samuniverse.in)

Buy the domain, then add it in GitHub Pages / Vercel / Netlify settings and follow their DNS instructions. Afterwards update the `canonical` URL near the top of `index.html`.

## Notes

- Respects "reduce motion" settings, works with keyboard, and is sized for phones first.
- Videos load only when tapped, so the page stays fast.
- Colours live at the top of `css/style.css` (`--red`, `--ember`, `--rose`, `--blush`, `--night`). Glass strength is `--glass` and `--blur`; film grain is `body::after` (raise or lower its `opacity`).
