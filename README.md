# CRM App

>A simple CRM (Customers, Deals, Products) with a Node/Express backend and a React + Vite frontend.

**Repository layout**

- [backend](backend): Express API and database schema
- [frontend](frontend): React app built with Vite

**Quick Overview**

This repository contains a backend server that exposes REST endpoints and a React frontend that consumes those APIs.

**Prerequisites**

- Node.js 18+ and npm
- PostgreSQL (or compatible) for the backend

**Install dependencies**

From the repository root you can install all parts separately:

```bash
# (optional) install top-level deps
npm install

# backend
cd backend
npm install

# frontend
cd ../frontend
npm install
```

**Run (development)**

Start the backend (dev uses `nodemon`):

```bash
cd backend
npm run dev
```

Start the frontend dev server:

```bash
cd frontend
npm run dev
```

The frontend dev server runs with Vite and the backend runs on the port defined in your backend `.env` (default 5000 recommended).

**Build & preview (frontend)**

```bash
cd frontend
npm run build
npm run preview
```

**Database**

- The SQL schema is at [backend/schema.sql](backend/schema.sql).
- Backend DB configuration is in [backend/config/db.js](backend/config/db.js).

Create a database and run the SQL in `schema.sql` to create the required tables. Example (psql):

```bash
createdb crm_db
psql -d crm_db -f backend/schema.sql
```

**Environment variables**

Create a `.env` file in `backend` with at least the following values:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=crm_db
JWT_SECRET=your_jwt_secret
```

**API & routes**

The backend routes are under [backend/routes](backend/routes):

- [backend/routes/auth.js](backend/routes/auth.js) — authentication
- [backend/routes/customer.js](backend/routes/customer.js) — customers CRUD
- [backend/routes/deal.js](backend/routes/deal.js) — deals CRUD
- [backend/routes/product.js](backend/routes/product.js) — products CRUD

By default the routes are mounted under `/api` (for example: `/api/auth/login`, `/api/customers`). Check [backend/server.js](backend/server.js) to confirm exact prefixes.

**Development notes**

- Authentication uses JWTs (see [backend/controllers/auth.js](backend/controllers/auth.js)).
- Middleware for auth and role checks are in [backend/middleware](backend/middleware).

**Contributing**

PRs welcome. Fork, create a branch, make your changes, and open a PR. If you add features, include or update tests and documentation.

**License**

This project is provided as-is; add a license file (e.g. MIT) if you intend to open-source it.
