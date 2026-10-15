# Supplied asset inventory

All website assets are present in `public/media/`. No replacement imagery was generated. The source originals remain untouched in the user's supplied locations; the website stores optimized derivatives only.

## Films

| Brief name | Actual supplied file | Website role | Desktop bytes | Mobile bytes |
| --- | --- | --- | ---: | ---: |
| `kling_20261015_VIDEO_Create_a_6_135_0.mp4` | `v1c.mp4` | `hero.mp4` | 2,166,079 | 587,008 |
| `gemini_generated_video_b8305b40.mp4` | `v2.mp4` | `origins.mp4` | 2,794,678 | 699,536 |
| `gemini_generated_video_26669c6d.mp4` | `v3.mp4` | `sensory.mp4` | 2,251,718 | 539,908 |

The user explicitly confirmed these mappings. The long filenames in the brief were not present; the attached aliases resolve all three requirements. Originals total 22,029,655 bytes; optimized desktop renditions total 7,212,475 bytes (about 67% smaller). Mobile renditions total 1,826,452 bytes. The browser loads the appropriate rendition, not both. Posters are frames at approximately 3 seconds from each film.

Encoding: desktop width 1280, H.264 CRF 23, keyframe interval 12; mobile width 768, CRF 26, interval 48; original frame rate; YUV420p, fast-start, no audio. Story posters remain visible until video is ready.

## Original photographs

Source: user-supplied TEPEEYA photography collection.

| Website file | Supplied original | Treatment |
| --- | --- | --- |
| `bottle.webp` | `Tepeeya Tepache Pineapple Bottle.png` | Original general identity; resized/compressed |
| `lineup.webp` | `Teepeya Tepache Five-Flavor Display.png` | Full five-flavour photograph; resized/compressed |
| `classic.webp` | `Teepeya Tepache Five-Flavor Display.png` | Crop of the first, explicitly labelled Classic bottle |
| `mango.webp` | `Mango Tepache Tropical Bottle Ad.png` | Resized/compressed |
| `spicy.webp` | `Premium Spicy Tepache Bottle.png` | Collection only; resized/compressed |
| `og.webp` | `Premium Tepache Bottle with Aztec Label.png` | OG-labelled bottle; resized/compressed |
| `honey.webp` | `Golden Honey Tepache Bottle.png` | Resized/compressed |
| `logo.webp` | `Tepeeya Logo transparent_upscayl_5x_upscayl-standard-4x.png` | Resized/compressed; transparency retained |
| `classic-label.webp` | `Label 2.png` | Complete Classic label; compressed |

The brief's numbered image names `Tepeeya Tepache Pineapple Bottle(2).png` and `Teepeya Tepache Five-Flavor Display(1).png` were not present. The user supplied the corresponding unnumbered photographs, which are integrated above. Unused alternative photographs were not copied into the website.

## Missing / awaiting configuration

No core visual asset is missing after the confirmed video mapping and supplied image aliases. Final social profile URLs, commercial availability remain unprovided. They are not fabricated. Prices and checkout are intentionally absent.

## Additional user-confirmed brand assets and recipes

- `wordmark.webp`: from `Screenshot 2026-10-14 210119.png`, preserving the exact supplied TEPEEYA Tepache lettering. White margins are framed with CSS.
- `brand-logo.webp`: from `Tepache_upscayl_5x_upscayl-standard-4x.png`, resized/compressed without redesign.
- `public/fonts/Satisfy-Regular.woff2`: original font from Google Fonts, with its Apache 2.0 license in `public/fonts/LICENSE.txt`.
- Ingredients for all five variants were confirmed by the user on 14 October 2026. They are in `src/content.js`; OG and Honey use substitutions, not additional white sugar. Tasting copy is editorial wording based on those ingredients, awaiting final brand review.

The locally hosted Latin WOFF2 fonts are Satisfy Regular, Macondo Regular, and Alegreya Sans Regular/Bold, from Google Fonts. Macondo and Alegreya Sans use the included SIL OFL licenses; Satisfy uses the included Apache 2.0 license. Original downloaded TTF copies were replaced with the smaller web renditions. No visitor requests Google Fonts.
