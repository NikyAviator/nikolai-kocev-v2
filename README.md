# nikolai-kocev-v2

Let's do a beatiful Tailwind CSS personal website.

The following will be a rough outline on the upcoming documentation and structure of the project.

### Technologies that will be used:

- **Node.js**
- **Express**
- **React**
- **Tailwind CSS**
- **Docker**
- **Google Cloud Platform (GCP)**

## Table of Contents

- [Frontend Setup](#frontend-setup)
- [Scripts](#scripts)

---

### Frontend Setup

I created a new repo on my github.
Inside the new repo I created a **frontend** folder. For now that will suffice, I might add a backend folder later, depending on the need for the project.

Before we begin we need to check if we have Node.js installed.

**What is Node.js?**

Node.js is a runtime environment that allows you to execute JavaScript on the server-side. Unlike JavaScript running in the browser, Node.js provides a way to build scalable network applications using the same language you use for frontend development. It’s important to note that Node.js isn’t part of JavaScript—it’s a separate installation that brings server capabilities to JavaScript. You can download it from the official Node.js website.

Verify the installation with:

```bash
node -v
npm -v
```

#### Create the Vite React Project

To create a React project with Vite (https://vite.dev/guide/).

Cd into the frontend folder, open a terminal and type:

```bash
npm create vite@latest .
```

Options that I chose: **JavaScript** and **React**.

---

#### Installing Dependencies

We shall use:

```
Express (https://expressjs.com/) 🚅
TailwindCSS (https://tailwindcss.com/)🌬️✈️
```

Install all dependencies (for this specific project) at once:

```bash
npm install express tailwindcss @tailwindcss/vite @headlessui/react @heroicons/react clsx @tailwindcss/typography prettier prettier-plugin-tailwindcss framer-motion react-router-dom
```

Please follow this guide: https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file

For the best class order.

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

I have no .prettier file right now!

Configure the Vite plugin (**_vite.config.ts_**):

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Import Tailwind CSS:

Add an `@import` to your CSS file that imports Tailwinds CSS.

```bash
@import "tailwindcss";
```

---

### Scripts

To get a clear snapshot of any project you are working on, use:

```bash
tree -I 'node_modules|.git|dist' -a -L 10
```

**Command Breakdown:**

- `tree`

Lists directory contents in a tree-like format.

- `-I 'node_modules|.git|dist'`

Excludes any directory (or file) matching the patterns node_modules, .git, or dist.

-I stands for “ignore pattern.”

The patterns are separated by |, so anything matching any of those names will be skipped.

- `-a`

Shows all files, including hidden ones (those starting with a dot, e.g. .env, .gitignore).

- `-L 10`

Limits the output to 10 levels deep. Adjust this number if you want more or fewer nested levels.

---
