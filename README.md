# Musica Divina

Portfolio and booking platform for a Belgian sound engineering business. Features equipment rental, quote requests, multi-language blog, client portal, and admin dashboard.

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Runtime | Node.js 20.9+ | Next.js 16 requirement |
| Package Manager | pnpm | Fast, disk-efficient |
| Framework | Next.js 16 | App Router, RSC, Cache Components |
| API | Hono | Edge-ready REST API |
| Database | Turso | SQLite edge |
| ORM | Drizzle | Type-safe, lightweight |
| Auth | Better Auth | Hono-native sessions |
| Payments | Mollie | Belgium/Bancontact optimized |
| Hosting | Fly.io | Full Next.js 16 support |
| Image Storage | Cloudflare R2 | S3-compatible |
| Email | Resend | Transactional emails |
| DNS/CDN | Cloudflare | Global edge |
| Rich Text | TipTap | Blog editor |
| Styling | Tailwind CSS | Utility-first |
| i18n | next-intl | Type-safe translations |
| Linting | Biome | Fast linter/formatter |
| Testing | Vitest | Unit tests |

## Features

### Client-Facing

| Feature | Description |
|---------|-------------|
| Portfolio | Project showcase with images/video |
| Services | Sound engineering offerings |
| Equipment Catalog | Rentable gear with availability |
| Quote Request | Service + date selection form |
| Blog | Multi-language articles (nl/en/fr/de) |
| Contact | Form + location/phone |
| Client Portal | Login, view bookings, download invoices |
| Checkout | Mollie payment for rentals/deposits |

### Admin Dashboard

| Feature | Description |
|---------|-------------|
| Dashboard | Overview stats, recent bookings |
| Blog Editor | TipTap rich text, image upload, language selector |
| Equipment Manager | CRUD, availability, pricing |
| Booking Manager | View/approve quotes, update status |
| Client List | Contact history, past bookings |
| Invoice Generator | PDF export, send via email |
| Media Library | R2 image management |
| Settings | Profile, languages, notifications |

## Git Workflow

**Model:** GitHub Flow

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready, always deployable |
| `feature/*` | New features |
| `fix/*` | Bug fixes |
| `chore/*` | Maintenance tasks |

### Flow

1. Create branch from `main`
2. Commit small, frequent changes
3. Open PR when ready
4. Merge to `main`
5. Auto-deploy

### Commit Convention
```
feat: add equipment catalog page
fix: resolve mollie payment redirect
docs: update README with tech stack
chore: upgrade next to 16.0.3
```

### Rules

- Never commit directly to `main`
- Keep branches short-lived (<3 days)
- Squash merge PRs
- Delete branches after merge

## Getting Started
```bash
pnpm install
pnpm dev
```

## License

Private