# 💸 SplitExpense

A modern, full-stack expense-sharing web application built with Next.js, Convex, and Clerk. SplitExpense enables users to easily create individual or group expenses, divide bills using dynamic calculation methods, track balances, and manage settlements in real-time.

> **Project Developed at:** S.N. Patel Institute of Technology & Research Centre (SNPITRC) / S.N. Patel Secondary & Higher Secondary School Campus (SNPSU)

---

## ✨ Key Features

- 👥 **Individual & Group Expenses:** Split costs 1-on-1 with a friend or seamlessly manage shared expenses across custom groups.
- 🧮 **Flexible Split Types:**
  - **Equal:** Splits expenses evenly among selected participants.
  - **Percentage:** Dynamically calculates amounts based on custom percentage inputs.
  - **Exact Amounts:** Allows specific dollar/currency allocations per individual.
- 📅 **Interactive Date & Category Selectors:** Categorize transactions and pick custom dates with built-in validation.
- 🔒 **Secure Authentication:** User sign-in and session management powered by Clerk.
- ⚡ **Real-Time Data Sync:** Instant state updates backed by Convex database queries and mutations.
- 🎨 **Responsive UI:** Styled with Tailwind CSS, Lucide Icons, and accessible UI primitives with theme support.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Backend & Database:** [Convex](https://www.convex.dev/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Form Handling & Validation:** `react-hook-form` + `zod`
- **Icons & Utilities:** `lucide-react`, `date-fns`, `sonner`

---

## 👥 Team Members & Contributions

| Member Name | Role | Primary Contributions |
| :--- | :--- | :--- |
| **[Your Name]** | Lead Developer | Full-stack architecture, Next.js page routing, split logic calculations, UI bug fixes, and Convex backend integration. |
| **[Teammate 1 Name]** | Frontend Developer | UI layout design, Tailwind styling, form controls, and responsive component integration. |
| **[Teammate 2 Name]** | Backend Developer | Convex schema design, database query optimizations, and Clerk authentication setup. |
| **[Teammate 3 Name]** | QA & Documentation | Form validation implementation, testing split edge-cases, and project documentation. |

*(Note: Replace bracketed names and roles above with your actual team member details).*

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18.x or higher recommended)
- **npm**, **pnpm**, or **yarn**

---

### Local Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name
