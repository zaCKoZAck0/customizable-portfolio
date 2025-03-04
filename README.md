# Portfolio

### [Portfolio URL](https://zackozack.xyz)

A fully customizable, professional portfolio website made with:

- Next.js
- Tailwind CSS
- Framer Motion
- Contentlayer
- shadcn/ui

![image](https://github.com/user-attachments/assets/db4c25c8-8765-4d51-b1be-b00bc83b14fc)

## Features

- **Fully customizable** with Contentlayer.
- **Dynamic content without a server** or database.
- Added **Blogs**.
- Precise and fluid **animations** with Framer Motion.
- Add / edit projects, blog posts, and more with **MDX**.
- **Typesafe** and secure.
- **Optimized** for **performance**.
- **OpenGraph** and **Twitter card** support.
- **Linting and Formatting** for enhanced developer experience.
- **Pre-rendered pages** for fast loading.
- (WIP) Integration with Github / Leetcode API.
- (WIP) Github commit graph and top repositories.
- (WIP) Realtime Leetcode rank and contest history.
- (WIP) SEO optimized.
- (WIP) Custom not-found page.

### Blog Features

- Pre-rendered blog pages as HTML.
- Syntax highlighting Code blocks.
- Custom Components.
  - Code blocks (with syntax highlighting)
  - Auto generated 'Table of Contents' and navigation.
  - Auto generate slug for routing.
  - Callouts
- (WIP) ai generated summary
- OpenGraph images.
- (WIP) SEO optimized.
- (WIP) Custom components for Youtube, etc.
- Intellegent blog search.
- Auto generated blog history table.
- Contact Page with customizable Email template.

![image](https://github.com/user-attachments/assets/f0637e22-218c-45b5-b5a4-89ff6c17c769)

![image](https://github.com/user-attachments/assets/678b916c-02a3-4181-8494-5e4121c673c2)

## Routes

```bash
/
/about-me
/blogs
/blogs/[slug]
/contact
/projects
```

## Adding / Editing Content

Edit / add `.mdx` files inside `src/content` directory to edit / add content to porfolio.

### Content Folder Structure

```bash
src/
    content/
        profile/
        projects/
        blogs/
```

- `profile/`: add only single `.mdx` file, used for user related data (name, links etc.)
- `projects/`: add project metadata and description.
- `blogs/`: add blog and metadata for each blog

#### Profile Schema (Required)

```mdx
username: // Alias or first name
fullName: // Full Name
headline: // A headline for website description
blogHeadline: // Headline for blog footer, can be same as headline
links: // Array of links

- platform: // platform name
  url: // your profile url
  alias: // username (visible as link text)

formalImage: // your professional headshot
profileImage: // a casual photograph for blog
role: // role in cyrrent org
company: // current org
```

## Runnning Locally

1. Clone the repository

```bash
pnpm install
```

2. Generate pages from Contentlayer

```bash
pnpm build:content
```

3. Running the project

```bash
pnpm dev
```

Deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FzaCKoZAck0%2Fcustomizable-portfolio&project-name=my-portfolio&repository-name=my-portfolio&demo-title=My%20Portfolio&demo-description=Portfolio%20and%20Blog%20website%20made%20with%20Next.js&demo-url=https%3A%2F%2Fzackozack.xyz)

**Please ⭐ star this repo, if you found this project helpful**
