```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## Creating the Initial Admin User

This project uses [better-auth](https://better-auth.com) for authentication. The first user created via the endpoint below is automatically promoted to admin.

### Create Admin (One-Time Setup)

After deploying, call this endpoint **once** to create the admin user:

```bash
curl -X POST https://your-app.workers.dev/v1/admin/create-initial \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-secure-password",
    "name": "Admin User"
  }'
```

**Security:** This endpoint is **self-disabling** - it returns `403 Forbidden` after the first user is created.

### Check Admin Status

```bash
curl https://your-app.workers.dev/v1/admin/status
```

Response:
```json
{ "hasAdmin": true }
```
