# MCP Server Auth

Dark, responsive authentication foundation for the Velclaw ecosystem.

## Included

- Google OAuth and GitHub OAuth using Auth.js.
- Email/password registration and login, with a protected account page and sign-out.
- Password hashing with bcrypt (12 rounds); passwords are never stored in plaintext.
- Prisma/PostgreSQL persistence for users, provider accounts, and sessions.
- Environment-variable configuration; no real credentials belong in Git.

## Required environment variables

See [`.env.example`](./.env.example). Never commit real credentials.

- `DATABASE_URL`: PostgreSQL connection string.
- `AUTH_SECRET`: cryptographically random secret.
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`: Google OAuth app credentials.
- `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`: GitHub OAuth app credentials.
- `AUTH_TRUST_HOST=true`: required for the Cloudflare Worker host.

OAuth callback URLs use `/api/auth/callback/google` and `/api/auth/callback/github`. Register the exact Preview hostname in the corresponding OAuth applications before testing provider login.

## Cloudflare Workers

This repository uses the OpenNext Cloudflare adapter for the existing Next.js 15 app.

- Build: `npm run build`
- Local Worker preview: `npm run preview`
- Deploy command: `npm run deploy`

Cloudflare Workers Builds is configured to create Worker Previews for non-production branches. The current production deploy command is intentionally disabled while the Preview is being validated. Do not enable production deployment or merge the deployment PR until the database adapter, runtime secrets, and OAuth callbacks have been verified.

## Local setup

1. Install dependencies with `npm install`.
2. Set environment variables in an untracked `.env` file.
3. Run `npx prisma generate`.
4. Review the database target and backup policy, then apply the Prisma schema to the intended database.
5. Run `npm run dev`.

## Preview readiness

The sign-in screen can be inspected independently of provider credentials. Real registration, password login, OAuth callbacks, session persistence, and sign-out require a Cloudflare-compatible PostgreSQL connection and all runtime secrets to be configured in the Preview environment. Do not point a Preview at the production database.
