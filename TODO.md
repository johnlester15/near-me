# Near-Me Dashboard Project TODO

## Current Status

- [x] Analyzed project structure (Next.js 16 App Router, Tailwind CSS 4, dashboard with mock data)
- [x] Reviewed key files: package.json, README.md, dashboard/inbox/page.tsx, jobs/page.tsx, dashboard-header.tsx, dashboard-nav.tsx, layout.tsx
- [x] Created project overview and edit plan template

## Completed Steps

- [x] Created/updated TODO.md
- [x] Analyzed core dashboard: pages (inbox/jobs/billing/dashboard/profile), components (nav/header/shell/tab/shared), context (subscription)
- [x] Reviewed mock-data.ts, auth/session.ts, proxy.ts, paymongo checkout API
- [x] Examined profile-tab.tsx (editable profile form), video-manager.tsx (YouTube/upload preview, premium-only), billing/page.tsx (PayMongo integration, plan upgrades)

## Pending

1. User task specification
2. Detailed edit plan
3. File modifications
4. Testing & deployment prep

## Project Notes

- Uses mock data from `@/lib/dashboard/mock-data.ts`
- Subscription context for plan management
- Responsive dashboard nav (desktop pill-style, mobile bottom nav)
- Hardcoded plan='free', user='Juan', unread=2 in layouts
