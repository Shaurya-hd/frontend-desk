# Chople's Desk — Marketing Website PRD

## Original problem statement
Design a website for Chople (product: Chople's Desk) — research & data analysis software for media houses to find hidden stories inside data, save time and increase engagement. Present features (Deep Research & Verification; Visualisation & Anomaly Detection; Connections) and newsroom problems (5). Interactive charts (line/bar/pie + controls), "every response backed by source", ChatGPT/Claude essay vs Chople auto-format comparison, difference table (8-10+ rows), second page with the actual platform view (Notes, 10 min vs 2 hrs, Trends), Enterprise Sales + Join Waitlist at top, X (https://x.com/Chople_it) & LinkedIn (https://www.linkedin.com/company/chople/). Professional, stylish, for journalists.

## User choices
- Forms: save to MongoDB + email notification to shaurya@chople.in (Emergent managed email)
- Light editorial theme with dark accent sections
- Single long home page + separate /platform page
- Logo: user to upload; SVG "C" mark recreated from screenshot for now (also favicon)

## Architecture
- Backend: FastAPI `/api/waitlist`, `/api/enterprise` → MongoDB (`waitlist`, `enterprise_leads`), background owner notification via `emailer.py` (EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME=Chople, OWNER_EMAIL)
- Frontend: React + Tailwind, framer-motion, lenis smooth scroll, recharts. Fonts: Cormorant Garamond / IBM Plex Sans / JetBrains Mono
- Chart/demo data is static illustrative data in `src/data/*`

## Implemented (Sep 2026)
- Home: kinetic hero + 3D-tilt live demo (auto-format line/bar/pie), sources marquee, dark problems bento, features TOC, claim tracer (verification w/ sources), ChartStudio (Line/Bar/Pie, values modes, order, values/zero/anomalies toggles, copy, CSV export, anomaly panel), connections graph + story thread, chatbot-vs-Chople format demo, 11-row comparison table, 120→10 min time section, platform teaser with parallax screenshots, waitlist + enterprise CTA, footer
- Platform: interactive product replica (Research/Trends/Notes/Live Sources, depth modes, add-to-notes w/ citations), Notes showcase, Trends showcase, real screenshots with clip reveal, time section, CTA
- Tested: iteration_1 — backend 12/12, frontend all flows passed

- Iteration 2: official Chople logo recreated as crisp SVG (nav, footer, app mock, favicon); top wordmark "Chople Desk / Desk by Chople"; "Trusted by users from" running logo carousel (Hindustan Times, India Today, NDTV, Republic World; self-hosted in /public/logos from Wikimedia); sources marquee moved below Problems

## Backlog
- P1: Admin view to see waitlist/enterprise submissions
- P2: Testimonials / newsroom logos, case-study page, blog/insights
- P2: Confirmation email to submitter
