# FSK CMS Starter (Hono + React)

A high-performance, full-stack headless CMS starter designed for the Cloudflare ecosystem (D1, R2, Workers).

## 🚀 The Stack

- **Server:** [Hono](https://hono.dev/) running on Cloudflare Workers (API + SSR pages).
- **Database:** [Drizzle ORM](https://orm.drizzle.team/) with Cloudflare D1.
- **Storage:** Cloudflare R2 for assets with automatic orphaned file cleanup.
- **Dashboard:** React + Tailwind CSS + Shadcn UI + Lucide Icons (Vite).
- **Monorepo:** Managed by [Turbo](https://turbo.build/).

## ✨ Features

- **Block-Based Editor:** A modular "IDE-style" editor with Structure, Canvas, and Inspector views.
- **Decoupled Architecture:** Clean separation between Page metadata and Block content.
- **Dynamic Icons:** Searchable Lucide icon picker integrated into the block editor.
- **Smart Assets:** Automatic cleanup of orphaned images from R2 when blocks are deleted.
- **Standardized Schema:** Ready-to-use Drizzle schema for pages and blocks.

## 🛠️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
bun install
```

### 2. Infrastructure Setup (Cloudflare)
Ensure you have the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated.

**Database (D1):**
```bash
cd apps/api
bun run db:create
bun run db:migrate
```

**Storage (R2):**
Create an R2 bucket named `app-assets` in your Cloudflare dashboard.

### 3. Environment Variables
Create a `.env` file in `apps/dashboard`:
```env
VITE_API_URL=http://localhost:8787
```

### 4. Run Locally
```bash
# From the root
bun run dev
```

## 📦 Project Structure

- `apps/server`: Hono API, D1/Drizzle logic, R2 asset handling, SSR public pages.
- `apps/dashboard`: React-based CMS management interface.
- `packages/shared`: Shared types and API client.
- `packages/db`: Centralized Drizzle schema.

## 📄 License
MIT
