# nikolai-kocev-v2

Let's do a beatiful Tailwind CSS personal website.

The following will be a rough outline on the upcoming documentation and structure of the project.

### Technologies Used:

- **Node.js**
- **Express**
- **React**
- **Tailwind CSS**
- **Docker**
- **Kubernetes**
- **Google Cloud Platform (GCP)**

## Table of Contents

- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Project Structure](#project-structure)
- [Docker Setup](#docker-setup)
- [Kubernetes Deployment](#kubernetes-deployment)
- [GCP Hosting](#gcp-hosting)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

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

Let us now take a look at all the dependencies we will need for the project.

(More dependencies might be added later but for now we start with these).

We will use:

```
Express (https://expressjs.com/) 🚅
TailwindCSS (https://tailwindcss.com/)🌬️✈️
```

To install Express:

```bash
npm install express
```

To install TailwindCSS (please follow the official guide if things change):

```bash
npm install tailwindcss @tailwindcss/vite
```

I am also using Tailwind Plus and it depends on:

```bash
npm install @headlessui/react @heroicons/react
```

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

### Backend Setup

None for now! But want to add login and blogging capabilities.
