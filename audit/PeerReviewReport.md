# Gluon Landing Page — Peer Review Report

**Repositories:** [StabilityNexus/Gluon-LandingPage](https://github.com/StabilityNexus/Gluon-LandingPage "StabilityNexus/Gluon-LandingPage")\
**Review area:** Gluon Stablecoin protocol marketing and educational landing page (`https://gluon.stability.nexus`): Next.js App Router architecture, static HTML export (`output: "export"`), subpath and root domain normalization (`basePath`, `assetPrefix`), hero layout, "Why Gluon" protocol value proposition, interactive protocol mechanics walkthrough (Fission, Fusion, and Beta Transmutation step animations with Framer Motion), mobile-optimized interactive step player, Terms of Use legal modal, AI agent readiness kit (`/api/info.json`, `/openapi.json`, `/.well-known/mcp.json`), Schema.org JSON-LD structured data injection, canonical SEO metadata, OpenGraph/Twitter cards, sitemap and crawler directives, dependency status, and cross-device responsiveness.

## Overall assessment

The review assessed the production codebase of the official Gluon Stablecoin protocol landing page. Automated checks and manual code review found **no security vulnerabilities** and **one low-severity defect** (Finding 1). The application is cleanly structured with Next.js and Tailwind CSS and is configured for static export (`output: 'export'`), so the exported site has no Next.js runtime; this review does not cover the hosting, browser-side code beyond the components listed below, dependencies, or third-party services. Interactive educational components—such as the Framer Motion mechanics visualizer, touch-friendly mobile step player, Terms of Use modal, and machine-readable AI agent metadata endpoints—were inspected and work as described in the matrix below. Linting and the static build completed without warnings or errors.

## Findings

### Finding 1 — Subpath asset URLs ignore the normalized base path

**Severity:** Low — functional issue (only affects subpath deployments)\
**Location:** `app/page.tsx:10`, `app/components/Navbar.tsx:8`, `app/ui/focus-rail.tsx:13`, `app/layout.tsx:80`

**Observation:** `next.config.ts` strips leading and trailing slashes from `NEXT_PUBLIC_BASE_PATH` before building `basePath` and `assetPrefix`, but these components prefix image URLs with the raw environment value. A value of `/gluon/` produces `/gluon//image.png`, and `gluon` (no leading slash) produces the relative `gluon/image.png`, which breaks on nested routes.

**Suggested resolution:** Export the normalized base path from one place (for example a small `basePath` constant shared with `next.config.ts`) and use it for every asset URL.

No security vulnerabilities were identified. The following security patterns and components were examined in detail:

- **Secrets and Credentials:** No private keys, wallet mnemonics, API tokens, or credentials exist in the codebase, static assets, or deployment configurations.
- **Cross-Site Scripting (XSS) & Structured Data:** Evaluated the Schema.org JSON-LD structured data in `app/layout.tsx`. It injects static compile-time JSON (`@type: "WebSite"`, `@type: "SoftwareApplication"`) without user-supplied inputs or string interpolation, presenting zero injection risk.
- **Reverse Tabnabbing Protection:** All external links opening in a new tab (`target="_blank"`) strictly declare `rel="noopener noreferrer"`.
- **Decoupled Informational Architecture:** The landing page serves as a secure, informational and educational portal that links out to the dedicated [Gluon-EVM-WebUI](https://github.com/StabilityNexus/Gluon-EVM-WebUI) for on-chain wallet transactions, keeping the landing page completely decoupled from private key management or transaction signing.
- **Static Export Output Isolation:** Static export (`output: "export"`) ensures that only pre-compiled HTML, CSS, JavaScript, and static JSON are served, removing dynamic backend attack vectors.
- **Dependency Hygiene:** Clean, minimal dependency graph leveraging React 19, Next.js, Tailwind CSS, and Framer Motion.

---

## Scope and verification matrix

| Area / Component | Status | Notes |
| --- | --- | --- |
| Static export compilation & root path handling | Partially verified | Root deployment (`gluon.stability.nexus`) verified. `NEXT_PUBLIC_BASE_PATH` deployments produce malformed asset URLs for some inputs (Finding 1). |
| Hero & Value Proposition ("Why Gluon") | Verified | Clean typography, responsive SVG icon rendering, and high-contrast call-to-action buttons. |
| Interactive protocol mechanics walkthrough | Verified | Interactive visualizer correctly demonstrates fission, fusion, and beta transmutation with smooth step transitions. |
| Mobile-specific walkthrough variant | Verified | `MobileHowItWorks.tsx` adapts desktop diagrams into touch-friendly cards for smaller screens. |
| Terms of Use Modal & Legal Protection | Verified | Closes via the close button, Cancel, or a backdrop click; Accept requires the agreement checkbox; acceptance is stored in `localStorage` per UTC day. |
| AI Agent Readiness Kit & Machine Endpoints | Partially verified | `/api/info.json`, `/openapi.json` and `/.well-known/mcp.json` are served as static files. The MCP manifest advertises an SSE transport at `/api/mcp`, which is not implemented in this repository. |
| Structured Data (JSON-LD) | Verified | Compiles static Schema.org metadata (`@type: "WebSite"`, `@type: "SoftwareApplication"`) into `<head>` cleanly. |
| Reverse tabnabbing & link safety | Verified | External anchor tags pointing to Stability Nexus or documentation strictly declare `rel="noopener noreferrer"`. |
| SEO, Sitemaps, and Crawler Directives | Verified | Configures `sitemap.xml`, `robots.txt` (blocking staging `/pr-preview/`), canonical URL, and OpenGraph social preview tags. |
| Responsive layout across screen viewports | Manually verified | Inspected layout across phone (360px–420px), tablet (768px), and desktop viewports. |
| Production dependency hygiene | Verified | Clean package tree with React 19, Next.js, Tailwind CSS, and Framer Motion. |

---

## Frontend review notes

The frontend is built with Next.js App Router, React 19, TypeScript, and Framer Motion. The user interface guides users through the dual-token mechanics of the Gluon protocol (Protons, Neutrons, and Gluon Z governance assets) without requiring complex Web3 wallet connections on the informational landing page itself, instead linking out to the dedicated [Gluon-EVM-WebUI](https://github.com/StabilityNexus/Gluon-EVM-WebUI) for on-chain interactions.

Static HTML generation succeeds without warnings, and all assets are exported to the `out/` directory.

---

## Validation

The following checks were verified against the repository:

- `npm run lint` (`eslint .`): Passed with zero warnings or errors.
- `npm run build` (`next build`): Successfully generated static export into `out/` with routes `/`, `/api/info`, and static 404 handler.
- Interactive mechanics testing: Exercised step navigation, manual tab selection, and autoplay reset behavior.
- Modal verification: Checked that the Terms of Use modal closes via the close button, Cancel and a backdrop click, and that Accept stays disabled until the agreement checkbox is ticked.
- Asset verification: Confirmed SVG logos, OpenGraph preview cards (`/opengraph-image.png`), and favicon resolution.

---

## Conclusion

The Gluon Stablecoin protocol landing page is performant and visually polished. No security vulnerabilities were identified in the reviewed code; one low-severity defect affects asset URLs on subpath deployments (Finding 1). The application cleanly implements its intended educational and marketing design and serves machine-readable protocol metadata, apart from the unimplemented MCP transport noted above.
