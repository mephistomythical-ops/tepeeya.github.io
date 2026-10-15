# Prototype verification

Final verification completed locally on 15 October 2026 before deployment.

## Results

- Production build: **passed** with Vite 7.3.7, React 19.3.0 and GSAP 3.15.0.
- Build/asset tests: **3 passed, 0 failed**.
- Browser checks: **16 groups passed**, using installed Chrome through Playwright.
- Browser runtime errors: **0** in the desktop/mobile primary flow.
- Visual review: desktop hero, both film chapters, collection and mobile hero/collection screenshots inspected. Mobile and tablet headline clipping and Classic bottle cropping were corrected.

## Browser coverage

1. Initial load requests only the hero film; both story video sources remain unset.
2. Hero pause control stops playback.
3. Origin video time advances with desktop scroll.
4. Sensory video time advances with desktop scroll.
5. Every flavour button updates the selected state and detail panel.
6. Keyboard activation selects a flavour.
7. No horizontal page overflow or hero headline clipping at 320, 390, 768, 1024 and 1440 px widths.
8. Mobile uses its smaller video rendition; menu navigation opens/closes correctly.
9. Reduced-motion mode starts with posters and no video sources or sticky scenes; user-initiated playback still works.
10. Blocked video requests retain posters and usable hero content.
11. No runtime exceptions during the main browser flow.

## Build and media checks

Production entry scripts, stylesheet and icon resolve under `/tepeeya.github.io/`. All six MP4 files have `moov` metadata before the media payload for fast-start playback. Each desktop film is under 3.5 MB, each mobile film is under 1 MB, and all six together are under 10 MB. All fourteen photograph/poster WebP files are present in the build.

The application JavaScript is approximately **356 kB / 120.5 kB gzip**. CSS is approximately **28.0 kB / 6.7 kB gzip**. Desktop films total **7.21 MB**, mobile alternatives total **1.83 MB**. Media is not all downloaded on entry; those totals are complete inventory sizes.

## Verification limits and handoff

Responsive browser emulation does not replace real-device testing. iPhone Safari, Android hardware, low-power mode and cellular network behaviour still need a physical-device pass. No Lighthouse score or full accessibility audit is claimed.

GitHub Actions contains reproducible build and browser checks. Local results above do not by themselves claim that a remote workflow has passed. Deployment is deliberately manual and was not run during prototype preparation.

There are no missing core visual assets after mapping the user-confirmed video aliases and supplied unnumbered image names. Final social URLs, final packaging specifications and commercial availability remain to be configured. See `ASSETS.md` and `README.md`.

## Brand and detail-panel checks

12. Supplied brand artwork and locally loaded script tagline render correctly, with no craft text in the header.
13. Every flavour opens a native modal showing its correct user-confirmed ingredients. Escape and the close button dismiss it; focus returns to its card. Keyboard focus stays inside the panel. Mobile dialogs fit the viewport and lock background scrolling while open.

Original gold TEPEEYA lettering is used as supplied imagery, not a substitute typeface. The complete uploaded logo is also included. The four local WOFF2 font files total approximately 82 kB.

## Additional video verification

14. All three mobile films decode and show advancing frames while visible. Each film pauses and resumes using its visible control. Both desktop story films also seek backwards when the visitor scrolls backwards.
15. The hero correctly resumes after changing between mobile and desktop renditions. A missing playback-effect dependency on viewport changes was found and corrected.

All six complete optimized MP4 streams were additionally decoded with FFmpeg to a null output: **6 passed, no decoding errors**. Mobile screenshots of all three films were visually inspected. The supplied hero film retains its existing Kling generator mark; no replacement product footage was generated.

The final pass includes Macondo display typography, Alegreya Sans body typography, feathered product imagery, soft section gradients and restrained scroll-linked film scale. All 15 browser check groups and 3 build/asset tests were rerun after these changes. The complete video decoding checks remain valid because the video files are unchanged.

The closing section and footer were subsequently refined into a continuous cream surface with feathered lineup photography and the original gold wordmark. Desktop and mobile footer screenshots were inspected, with no horizontal overflow. The production build, all 3 asset tests and all 15 browser groups passed again after the footer refinement.


## Preview playback and collection follow-up

The in-app preview exposed an invisible hero video while its playback time advanced. Replacing the CSS mask on the video with a separate gradient overlay and reloading restored visible footage. All three films were visually checked in the actual in-app preview. Playback now also resumes on returning to a visible tab while respecting manual pause.

All five thumbnail frames have identical square proportions, verified at 320, 390, 768, 1024 and 1440 px widths. Classic uses the supplied general pineapple bottle photograph in its collection thumbnail; the detail dialog retains the explicitly labelled Classic crop. Production build, 3 asset tests and 16 browser groups passed after these fixes.

