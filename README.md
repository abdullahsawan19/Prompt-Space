# PromptSpace 🚀

**Where Intelligence Collaborates.** PromptSpace is a comprehensive SaaS platform designed to help individuals and teams organize, test, and share AI prompts. It provides a structured environment with dedicated workspaces, advanced version control for iterative prompt engineering, and an intuitive analytics dashboard.

## ✨ Key Features

* **Workspace Management:** Create personal or team-based workspaces to logically group and manage prompts.
* **Prompt Version Control:** Never lose a good prompt. The platform tracks every edit, maintaining a complete version history (`prompt_versions`) for seamless rollbacks and tracking.
* **Team Collaboration & Invitations:** Invite team members to workspaces with role-based access control (Owner, Admin, Editor, Viewer). Automated email invitations are handled securely via Edge Functions.
* **Analytics Dashboard:** Visual insights into your productivity using interactive Area and Pie charts (powered by Recharts), tracking prompt creation and workspace distribution.
* **Optimized Performance:** Lightning-fast data fetching, caching, and optimistic UI updates powered by TanStack Query.
* **Seamless Authentication:** Secure login/signup flows including Email/Password and OAuth providers.
* **Adaptive UI:** Fully responsive design with a built-in Dark/Light mode toggle.

## 🛠 Tech Stack

* **Frontend:** React, React Router v6/v7, Tailwind CSS
* **State Management & Data Fetching:** TanStack Query (React Query)
* **Backend & Database:** Supabase (PostgreSQL, Auth)
* **Serverless/Functions:** Deno Edge Functions (Supabase)
* **Integrations:** Brevo (SMTP/Email Invites), Recharts (Data Visualization), React Hot Toast

## 🚀 Getting Started

### Prerequisites
* Node.js installed on your machine.
* A Supabase account and project.
* A Brevo API key for email services.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/promptspace.git](https://github.com/your-username/promptspace.git)
    cd promptspace
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    *Note: For edge functions, ensure `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `BREVO_API_KEY` are configured in your Supabase dashboard.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [(https://prompt-space-phi.vercel.app/)](https://prompt-space-phi.vercel.app/) in your browser to see the app.
