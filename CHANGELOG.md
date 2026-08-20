# Changelog

All changes below were made on **2026-08-20**.

## Home page — no longer stuck on a loading spinner
- **Change:** Removed the full-page loading gate on the public home page so it renders immediately; only the practice-areas section shows a placeholder while its data loads. Added an 8s `AbortController` timeout to the team/blog/practice-area client fetches so a slow or unreachable database can never lock the page.
- **Why:** The entire home page (hero, about, CTA) was gated behind a client-side fetch that only cleared the spinner in a `finally`. If any DB-backed API call hung, `isLoading` stayed `true` forever and only the spinner showed.

## Good, unique, editable slugs (blog, team, practice-areas)
- **Change:** Improved `lib/slugify.ts` (accent transliteration + non-empty fallback). Blog POST/PUT and team/practice-areas PUT now generate unique slugs and accept an optional explicit slug. Admin new/edit forms gained an editable, auto-generating **URL Slug** field with a live `/blog/`, `/team/`, `/practice-areas/` preview.
- **Why:** Slugs were generated silently server-side, and the blog regenerated its slug on every edit (breaking shareable URLs). Needed clean, stable, admin-controllable URLs.

## Modern, functional share buttons on blog articles
- **Change:** Replaced the dead placeholder buttons with working **X, LinkedIn, Facebook, WhatsApp, Email, Copy-link** (with "copied!" feedback) plus a native Share button using `navigator.share` on mobile.
- **Why:** The old buttons had no `onClick` and did nothing, hurting shareability and referral traffic.

## Light global polish
- **Change:** Added global `:focus-visible` brand outline, brand-tinted `::selection`, `img/svg/video` max-width defaults, and `scroll-padding-top` for the fixed navbar.
- **Why:** Consistency and accessibility polish without changing layout or colors.

## Blog image optimization
- **Change:** Added `lib/image.ts` (`optimizeCloudinaryUrl`) injecting Cloudinary transforms (`f_auto,q_auto,w_…`); applied to the blog detail hero, related thumbnails, and blog list images. Added placeholder backgrounds behind image containers.
- **Why:** `images.unoptimized: true` meant `next/image` served full-resolution originals, so blog images took very long to appear.

## About page restyled (distinct from home) + removed false stats
- **Change:** Rebuilt the About page into a distinct editorial layout (breadcrumbed hero, "Our Story", Mission/Vision, Values, Practice Areas, Memberships, CTA). Removed the fabricated timeline milestones and the unverified stats strip.
- **Why:** The About page was a near-copy of the homepage hero ("home page vibes"), and it contained invented/unverifiable stats.

## Gallery empty-paragraph fix
- **Change:** Added `lib/richtext.ts` (`cleanRichText`) to strip empty paragraphs; gallery descriptions now render as cleaned HTML in the public grid and the admin list.
- **Why:** Gallery descriptions stored as rich HTML rendered as literal `<p>Managing Partner, Advocate</p><p></p>` tags, including a stray empty paragraph.

## Blog SEO — canonical URL + Article structured data
- **Change:** Added `alternates.canonical` to blog-post metadata and a `BlogPosting` JSON-LD `<script>` on each blog detail page.
- **Why:** No canonical meant potential duplicate-content issues across hosts; no structured data meant missing rich-result eligibility — both weaken blog crawl/index performance. (Note: submit `/sitemap.xml` in Google Search Console and use "Request Indexing" to trigger crawling.)
