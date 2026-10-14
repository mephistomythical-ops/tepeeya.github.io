# TEPEEYA — cinematic brand prototype

A responsive editorial brand website built with Vite, React and GSAP ScrollTrigger. Uses only the supplied TEPEEYA photography and three user-confirmed films. Includes a real five-flavour HTML collection, Classic label information, keyboard controls, reduced-motion support and mobile film fallbacks. No prices, cart, checkout or tracking. The script font is bundled locally.

## Run locally

Use Node.js 24 and pnpm 11.25.0 (declared in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the address printed by Vite, including `/tepeeya.github.io/`.

```sh
pnpm build
pnpm test
pnpm exec playwright install chromium
pnpm test:browser
pnpm preview
```

Browser verification starts and stops its own production preview on port 4173. It writes screenshots and results to ignored `test-results/`. Set `CHROME_PATH` to an installed Chrome executable to use it instead of downloading Chromium. `dist/` is the complete static build and is intentionally not committed.

## GitHub Pages — manual deployment after review

Target repository: **mephistomythical-ops/tepeeya.github.io**.

Its default Pages URL is **https://mephistomythical-ops.github.io/tepeeya.github.io/**. Naming a project repository `tepeeya.github.io` does not give it the root URL `https://tepeeya.github.io/`; that would require the corresponding GitHub account/organization and user-site repository.

`vite.config.js` defaults to `/tepeeya.github.io/`, and all media URLs use `import.meta.env.BASE_URL`. To deploy on a root domain later, set `VITE_BASE_PATH=/` at build time. For another project path, use its trailing-slash path. No client-side routes or history fallbacks are needed; section navigation uses anchors.

1. Review the prototype and verification results.
2. In GitHub **Settings → Pages**, set the source to **GitHub Actions**.
3. In **Actions**, select **Deploy reviewed prototype to GitHub Pages** and run it on `main`.
4. The workflow installs the locked dependencies, builds, validates assets, runs browser checks, uploads `dist`, and deploys.

Pushes and pull requests run **Verify prototype** only. They never trigger deployment. The deployment workflow is deliberately `workflow_dispatch` only. The prototype has no commercial checkout.

## Film and performance behaviour

- Hero: muted inline playback, explicit pause/play control, pauses out of view.
- Story chapters: desktop ScrollTrigger-driven seeking within sticky scenes. Seeking is throttled by the video `seeking`/`seeked` state, avoiding overlapping decode requests.
- Narrow screens and coarse pointers: smaller videos play only while visible, with pause/play controls; no long sticky sections.
- Reduced motion or data saver: posters first, no automatic video downloads. Visitors can explicitly play a film. Reduced motion removes scroll animations and sticky scenes.
- Footer motion control disables animation globally; operating-system reduced motion takes precedence.
- Story video URLs are assigned only near the viewport. Initial requests include only the hero film. Product images are lazy-loaded with reserved layout dimensions.
- Six H.264/YUV420p renditions include fast-start metadata. Desktop videos use a 12-frame keyframe interval for seeking. All renditions are silent, with no audio payload.
- WebP photography derivatives and posters are local. No runtime CDN dependencies. Satisfy is bundled locally with its Apache 2.0 license.
- Failed films retain their poster and all text/navigation. Autoplay rejection leaves a play control on non-scrub films.

## Content and assets

See [ASSETS.md](ASSETS.md) for source mapping and sizes. The user explicitly confirmed `v1c → Video 1`, `v2 → Video 2`, `v3 → Video 3`.

The Classic label supplies the product origin description, ingredients, 250 ml size, storage instructions, maker address and email. Nutritional estimates, probiotic, health and alcohol-status claims have not been transcribed into marketing copy. The original Classic label remains viewable as an image. The user confirmed the other variant recipes: Mango adds mango; Spicy adds ginger and green chilli; OG replaces sugar with brown cane sugar; Honey replaces sugar with honey. Each native dialog shows these ingredients, flavour descriptions derived from them, and a serving suggestion. The Classic-only bottle size and detailed storage instructions remain scoped to Classic.

Edit `src/content.js` for flavour copy and Classic facts. Page composition and film behaviour live in `src/main.jsx`; styling is in `src/styles.css`.

## Remaining work before a public launch

- Brand review of ingredient-based tasting descriptions and final packaging details.
- Configure real Instagram/Facebook URLs; the current footer entries are clearly labelled “Link coming soon” and are not fake links.
- Review the source films' existing generator marks. They were retained; clean approved masters can be supplied later.
- Check actual iPhone/Safari and Android devices on cellular connections; local automated checks use Chromium with responsive and reduced-motion settings.
- Choose availability/contact handling when commercial details are ready. No prices or checkout are implemented.
- Authorize and run the manual Pages workflow after reviewing this first prototype.

Implementation references: [Vite static deployment](https://vite.dev/guide/static-deploy.html), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

## Brand refinement

The header and detail dialogs use the supplied gold TEPEEYA / green Tepache artwork, framed with CSS without redrawing the identity. The footer includes the uploaded complete logo. The tagline is **Un Fermento Mexicano**, set in locally bundled [Satisfy](https://github.com/google/fonts/tree/main/apache/satisfy). Flavour dialogs support Escape, backdrop close, keyboard focus containment, focus return and background scroll locking.

