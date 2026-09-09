# Buddy-Bank

> A group expense-splitting app — split bills, track debts, and settle up with friends.

## Overview

Buddy-Bank helps groups of friends track shared expenses and simplify debt. Create a group, add expenses (manually or by scanning a receipt with AI), split costs per item or equally, and let the app compute who owes whom with the minimum number of transfers.

## Features

- **Group Management** — create groups, invite friends, edit group details
- **Expense Tracking** — log expenses with categories, descriptions, and receipt images
- **AI Receipt Scanning** — upload a receipt photo and let AI extract line items automatically
- **Per-Item Splitting** — toggle which members share each item on a bill
- **Debt Simplification** — greedy algorithm minimizes the number of transfers needed to settle up
- **Friend System** — search users, send/accept friend requests
- **Profile Management** — edit name, avatar (camera, gallery, or built-in SVG), and password
- **Auth** — email/password login and Google OAuth via Supabase Auth

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native / Expo SDK 54, TypeScript, expo-router v6 |
| Backend | Python 3.10+, FastAPI, SQLAlchemy (async), Pydantic v2 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password + Google OAuth) |
| File Storage | Supabase Storage (receipts, avatars) |
| AI | OpenRouter API — `google/gemini-3-flash-preview` for receipt parsing |

## Project Structure

```
Buddy-Bank/
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py                # FastAPI entrypoint
│       ├── core/config.py         # Settings & Supabase client init
│       ├── api/
│       │   ├── receipts.py        # POST /api/receipts — AI receipt analysis
│       │   ├── users.py           # POST /api/users — user search
│       │   └── expenses.py        # Expense CRUD (not yet mounted)
│       ├── db/
│       │   ├── models.py          # SQLAlchemy models
│       │   ├── database.py        # Async engine
│       │   └── deps.py            # get_db dependency
│       ├── schemas/               # Pydantic schemas
│       └── services/
│           ├── user.py            # Auth helpers, user search
│           ├── expense.py         # Add/get/update/delete expense
│           ├── balance.py         # Balance updates per group
│           ├── debt.py            # Debt simplification algorithm
│           └── ai_service.py      # OpenRouter receipt parsing
├── frontend/
│   ├── package.json
│   ├── app.json                   # Expo config
│   ├── tsconfig.json              # @/* alias → ./src/*
│   └── src/
│       ├── app/                   # expo-router file-based screens
│       │   ├── authTab/           # Login, Sign-up
│       │   ├── appTab/            # Groups, Friends, Profile tabs
│       │   └── otherTab/          # Create group, Add expense, Review items, etc.
│       ├── components/            # UI components organized by screen
│       ├── constants/             # Colors, categories
│       ├── services/              # Supabase & backend API calls
│       └── types/                 # TypeScript types (generated DB types)
```

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.10+
- A **Supabase** project ([supabase.com](https://supabase.com))
- An **OpenRouter** API key ([openrouter.ai](https://openrouter.ai))

## Getting Started

### 1. Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # macOS/Linux
# venv\Scripts\activate    # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file (see Environment Variables below)
cp .env.example .env       # or create manually
```

Start the development server:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

### 2. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (see Environment Variables below)

# Start the app
npx expo start
```

Then open in:
- **iOS Simulator** — press `i`
- **Android Emulator** — press `a`
- **Expo Go** — scan the QR code

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `DB_USER` | Supabase Postgres user | `postgres` |
| `DB_PASSWORD` | Supabase Postgres password | `your-password` |
| `DB_HOST` | Supabase Postgres host | `db.bxzvsnxjjohblxhgnqco.supabase.co` |
| `DB_PORT` | Postgres port | `5432` |
| `DB_NAME` | Database name | `postgres` |
| `SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_KEY` | Supabase service role key | `eyJ...` |
| `OPENROUTER_API_KEY` | OpenRouter API key | `sk-or-...` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|---|---|---|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase project URL | — |
| `EXPO_PUBLIC_SUPABASE_KEY` | Supabase anon/public key | — |
| `EXPO_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8000/api` |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/receipts/?image_url=<url>` | Analyze a receipt image and return extracted items |
| `POST` | `/api/users/?q=<query>` | Search users by username or real name (requires auth) |
| `POST` | `/api/expenses/` | Create a new expense *(not yet mounted)* |
| `GET` | `/api/expenses/{id}` | Get expense details *(not yet mounted)* |
| `PUT` | `/api/expenses/{id}` | Update an expense *(not yet mounted)* |
| `DELETE` | `/api/expenses/{id}` | Delete an expense *(not yet mounted)* |

## Database Schema

| Table | Description |
|---|---|
| `user` | Public user profile (id, username, realname, image_url) |
| `group` | Groups (id, name, image_url) |
| `user_group` | Group membership with running balance & expense totals |
| `expense` | Expenses tied to a group (amount, category, description, receipt image) |
| `receipt_item` | Individual line items extracted from a scanned receipt |
| `expense_split` | Per-user split amounts for each expense or receipt item |
| `debt` | Simplified debts (lender, borrower, amount, is_paid) |
| `friend` | Mutual friendships (symmetric, user1 < user2) |
| `friend_request` | Pending friend requests (sender, receiver) |

**Expense categories:** `general`, `fd` (food & drink), `transport`, `shopping`, `entertainment`

## Known Issues

- Several screens (add expense, debt detail, expense detail, friend requests) still use **mock/hardcoded data** and are not fully wired to the backend.
- **Sign-up** does not call the Supabase auth API yet — it redirects directly to the app.
- The **expense CRUD router** (`/api/expenses`) is defined but not mounted in the FastAPI app.
- `frontend/.env` containing API keys is committed to the repo — **should be added to `.gitignore`**.

## License

This project is for educational purposes.
