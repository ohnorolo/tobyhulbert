# tobyhulbert.co.uk

A plain static site. There is nothing to install or build: GitHub Pages serves the `docs` folder from the `master` branch as it is.

## Where things are

- `docs/index.html`: the page and all its copy
- `docs/js/credits.js`: the credits list and the videos
- `docs/css/site.css`: colours, type and layout
- `docs/images/work/`: cover art and posters
- `docs/images/site/`: studio photos, the 9dB logo and the background texture

## Adding a credit

Open `docs/js/credits.js` on GitHub, press the pencil, copy a line in the `film` or `records` list and change the text. Newest goes at the top. The first ten in each list show before "Show all" is pressed.

## Adding cover art

1. Upload a square image (posters can be portrait), about 600px wide, to `docs/images/work/`.
2. Add `art: "the-file-name.jpg"` to that credit's line in `credits.js`.

The image then appears next to the pointer when someone hovers that credit.

## Do not delete

`docs/CNAME` and `docs/.nojekyll`. The first holds the domain name.
