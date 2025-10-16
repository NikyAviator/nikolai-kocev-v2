# nikolai-kocev-v2

**Hello!**

_Welcome to my personal website!_

## Table of Contents

- [My Tech Stack](#my-tech-stack)
- [Running in Development](#running-in-development)
- [Scripts](#scripts)
- [DevOps](#devops)

---

### My Tech Stack

**Front end:**

- React
- Tailwind CSS
- Vite (front end building tool)

**Back end:**

- Go
- Gin
- MongoDB

**DevOps**

- Bash
- Docker
- Kubernetes (Not implemented yet)
- GCP (Google Cloud Platform) (Not implemented yet)

---

### Running in Development

## **TODO INSTALL ALL DEPS Node & GO Bash Script on fresh git clone**

Then to **run** the project, in the root folder run:

```bash
npm run dev
```

- Backend (GO) will run on http://localhost:5000/

- Frontend (Vite: React & JS) will run on http://localhost:5173/

- any calls to /api/\* on **5173** from the front end will be forwarded to the GO backend at port **5000**.

---

### Scripts

To get a clear snapshot of any project you are working on, use:

```bash
tree -I 'node_modules|.git|dist' -a -L 10
```

**Command Breakdown:**

To check with what we are cooking with in this project (or any for that matter):

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

### To populate db with admin and three Blogs - TODO

## TODO()

This will be done with Go, I am working on the implementation as we speak.

---
