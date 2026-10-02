# Andrew Broshears · Portfolio

A React portfolio with a custom Three.js mechanical assembly and native-scroll GSAP choreography. Designed for GitHub Pages, without a backend or a client-side router.

## Run locally

Requires Node.js 22.12+ (Node 24 recommended).

- `npm ci` — install the locked dependencies.
- `npm run dev` — start the local development server; open the URL it prints.
- `npm run build` — create the production site in `dist/`.
- `npm run preview` — serve the production build locally.

Opening `index.html` directly is no longer supported: JSX and modules need the Vite server or the compiled production site.

## Publish to GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. Push to `main` or run the Deploy portfolio workflow manually. The workflow builds and publishes `dist/`. No push or repository settings change is performed by local development.

This configuration targets the root user site `https://andrewbroshears.github.io/`. A project subpath would also require updating absolute asset links and Vite's base URL.

## Edit content

- `src/content.js` — résumé-aligned projects, skill groups, and experience.
- `src/App.jsx` — hero, section copy, navigation, and contact.
- `src/styles.css` — responsive design tokens, layouts, and themes.
- `src/AssemblyScene.jsx` — original procedural Three.js geometry, materials, lighting, and scroll-linked assembly.
- `src/useJourneyMotion.js` — scoped GSAP introduction and section transitions.
- `assets/` — public files copied to the root of `dist/`: `/img/...` and `/Andrew_Broshears_Resume_v2.pdf`.

The old `css/` and `js/` static-site files are retained for reference but are not loaded by the React app or included by Vite's module graph.

## Motion and accessibility

The site uses native scrolling, not scroll hijacking. Project filters are buttons with pressed states; project notes use native disclosure elements. Reduced-motion preferences disable the animated scene. A visible pause button also stops the scene and GSAP choreography. The renderer suspends when offscreen or the document is hidden and disposes GPU resources when unmounted. If WebGL or its dynamic import fails, static artwork remains. System color preference determines the initial theme, with a manual theme switch available.

## Visual asset provenance

The portrait and public project screenshots come from the supplied assets. Production project diagrams are explicitly conceptual, not private application screenshots. The mechanical assembly is procedural geometry created in Three.js, not a generated depiction of a real system.

**Higgsfield MCP was not connected in the implementation environment.** No Higgsfield generation, rigging, or external API integration is claimed. A real integration requires the MCP connection and its supported generation/export tools; the scene component is isolated for a future asset replacement. No API keys belong in this public client-side app.

## Content and privacy

Project details are kept within the supplied résumé and existing portfolio evidence. Unverified live demos are not advertised as available. The page contains no phone number, but the original downloadable résumé still contains the phone number supplied in that PDF. Replace it with a redacted résumé before publishing if that number should not be public.
