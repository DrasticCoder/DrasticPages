# DrasticCoder Pages

A Next.js 13 blog platform integrated with Supabase for content management. This project uses Supabase as the backend to store and serve pages, and includes an admin panel to create, update, and delete pages.

## Features

- **Dynamic Blog Pages:** Render pages dynamically using data from Supabase.
- **Admin Panel:** Create, update, and delete pages via a dedicated admin interface.
- **Markdown Rendering:** Write page content in Markdown with a live preview.
- **Supabase Integration:** Leverage Supabase for authentication, database operations, and Row Level Security (RLS).
- **Responsive Design:** Built with Tailwind CSS for fast, responsive styling.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or above)
- [pnpm](https://pnpm.io/) package manager
- A [Supabase](https://supabase.com/) account and project

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/DrasticCoder/DrasticPages.git

cd DrasticPages
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project and add the following variables:

```env
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Admin password for authentication (optional)
ADMIN_PASSWORD=your_admin_password
```

Replace the placeholder values with your actual Supabase project URL, anonymous key, and a secure admin password.

### 4. Set Up Supabase Database

#### a. Create a Supabase Project

- Log in to your [Supabase dashboard](https://app.supabase.com/) and create a new project.

#### b. Run Migrations

- Use the migration file found in `supabase/migrations/8892320_square_sea.sql` to set up your database schema. You can run the migration using one of the following methods:

**Using Supabase CLI:**

```bash
supabase db push
```

**Or using psql:**

```bash
psql -h your-db-host -U your-db-user -d your-db-name -f supabase/migrations/8892320_square_sea.sql
```

#### c. Adjust Row Level Security (RLS) Policies

Since RLS is enabled on your `pages` table, ensure you have the appropriate policies for your workflow. For example, to allow inserts from the anon role during development, run:

```sql
CREATE POLICY "Allow anon inserts on pages"
  ON pages
  FOR INSERT
  USING (true);
```

> **Note:** For production, tighten these policies or use authenticated requests.

### 5. Running the Project Locally

Start the development server with:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your app.

## Troubleshooting

- **Content Touching Screen Edges:**
  Wrap your content in a container element to control the width. For example, using Tailwind CSS:

  ```jsx
  <div className="max-w-7xl mx-auto px-4">{/* Your content */}</div>
  ```

- **Supabase RLS Errors:**
  If you encounter errors such as "new row violates row-level security policy", verify your RLS policies in Supabase and ensure they match your intended access level.

- **Favicon Issues:**
  If requests for `favicon.ico` are causing errors, add a favicon file to the `public` folder.

## Deployment

You can deploy this project using platforms like [Vercel](https://vercel.com/) or any other Node.js hosting provider. Make sure to set the required environment variables on your deployment platform.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any issues or questions, please contact [DrasticCoder] at [drasticoder@gmail.com].
