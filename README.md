# 💸 SplitCircle

A modern, full-stack expense-sharing web application built with **Next.js**, **Convex**, and **Clerk**. SplitCircle lets users record individual or group expenses, split bills using flexible calculation methods, track balances in real time, and settle up with friends — without the mental math or the spreadsheet.

> **Academic Project Developed at:** Sapthagiri NPS University
---

## 📖 About The Project

Splitting shared expenses among friends, roommates, or a trip group usually means someone ends up doing mental math, chasing people for money, or losing track of who paid for what. **SplitCircle** solves this by giving everyone a shared, live view of who owes whom — updated instantly, with no manual reconciliation needed.

### ✨ Key Features

- 👥 **Individual & Group Expenses** — Split costs one-on-one with a contact, or organize shared costs inside dedicated groups (roommates, trips, events).
- 🧮 **Dynamic Split Types**
  - **Equal** — Divides an expense evenly across all participants.
  - **Percentage** — Assign a custom percentage share to each participant.
  - **Exact Amounts** — Enter precise, custom amounts per participant for full control.
- 💰 **Smart Settlements** — Automatically calculates the minimum number of payments needed to settle up a group, instead of everyone paying everyone.
- 📅 **Interactive Date & Category Selectors** — Categorize each expense and pick custom dates, with full form validation.
- 🔒 **Secure Authentication** — Sign-in, session persistence, and profile management powered by Clerk.
- ⚡ **Real-Time Sync** — Balances, expense lists, and group activity update instantly for every member via Convex's live queries.
- 🔔 **Automated Reminders** — Background jobs (via Inngest) send payment reminders and periodic spending insights.
- 🎨 **Polished, Responsive UI** — Built with Tailwind CSS and Base UI components, engineered to avoid common hydration and HTML-nesting pitfalls.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [Next.js](https://nextjs.org/) (App Router, Turbopack) |
| **Backend / Real-Time DB** | [Convex](https://www.convex.dev/) |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/), `shadcn/ui`, `lucide-react` |
| **Forms & Validation** | `react-hook-form` + `zod` |
| **Background Jobs** | [Inngest](https://www.inngest.com/) |
| **Utilities** | `date-fns`, `sonner` (toasts) |

---

## 👥 Team Members & Contributions

| # | Member | Role | Core Contributions |
| :-: | :--- | :--- | :--- |
| 1 | **Nitin Pathania** | Backend Lead | Full-stack architecture, Next.js routing, Convex schema & backend logic, expense-splitting algorithms, and bug fixes across auth, database, and deployment. |
| 2 | **Nithish Prakash** | Frontend Developer | UI layout implementation, Tailwind CSS styling, and responsive component design. |
| 3 | **Nilabh Singha** | Backend Developer | Convex query/mutation development, real-time data sync, and API integration. |
| 4 | **Nehal P.** | QA & Testing | Form validation, edge-case testing for split calculations, and error-handling verification. |
| 5 | **Bhargava R.** | UI/UX & State Management | Toast notifications, modal integrations, and component-level state management. |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.x or higher
- **npm**, **yarn**, or **pnpm**
- A [Convex](https://www.convex.dev/) account and a [Clerk](https://clerk.com/) account

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/SplitCircle.git
   cd SplitCircle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   CLERK_JWT_ISSUER_DOMAIN=https://your-instance.clerk.accounts.dev

   # Convex
   NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

   # Inngest (local dev)
   INNGEST_DEV=1
   ```

   > ⚠️ `.env.local` should never be committed. Confirm it's listed in `.gitignore` before pushing.

4. **Start the Convex backend**
   ```bash
   npx convex dev
   ```

5. **Start the Next.js dev server**
   ```bash
   npm run dev
   ```

6. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Repository Structure

```
├── app/                      # Next.js App Router
│   ├── (auth)/                # Sign-in / sign-up routes
│   └── (main)/
│       ├── dashboard/          # Balance overview, spending charts
│       ├── groups/             # Group pages, balances, members
│       ├── person/             # 1:1 expense history with a contact
│       └── expenses/new/       # Expense creation form & split logic
├── components/                # Shared UI primitives (buttons, popovers, avatars, etc.)
├── convex/                    # Convex schema, queries, and mutations
├── hooks/                     # Custom React hooks (e.g. use-convex-query)
├── lib/                       # Category utilities, formatting helpers
└── public/                    # Static assets and icons
```

---

## 🏛️ Academic Context

Sapthagiri NPS University**.
