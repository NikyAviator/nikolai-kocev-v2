# nikolai-kocev-v2

**Hello!**

_Welcome to my personal website!_

### Technologies that are used:

**Front end:**

- React
- Tailwind CSS

**Back end:**

- Node.js
- Express
- MongoDB
- Mongoose

**DevOps**

- Bash
- Docker
- Kubernetes (Not implemented yet)
- GCP (Google Cloud Platform) (Not implemented yet)

## Table of Contents

- [Running in Development](#running-in-development)
- [Scripts](#scripts)
- [DevOps](#devops)

---

### Running in Development

Install all node_modules in the **root**, **frontend** & **backend** folder of the project with:

```bash
npm install
```

Then to run the project. Cd into the **root** folder of the project and:

```bash
npm run dev
```

- Backend will run on http://localhost:3000/

- Frontend (Vite) will run on http://localhost:5173/

- any calls to /api/\* on 5173 will be forwarded to our Express app (the backend) on 3000.

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

### DevOps

#### 🧠 TLDR: What is DevOps?

**DevOps** is a combination of **Development** and **Operations**. It’s a cultural and technical approach to software development that aims to:

- 🚀 Deliver software **faster** and **more reliably**
- 🔁 Automate the **build → test → deploy** lifecycle
- 🤝 Improve collaboration between devs and sysadmins
- 📦 Use tools like **Docker**, **Kubernetes**, **CI/CD**, and **cloud platforms** like GCP or AWS. We will use GCP.

In this project, DevOps plays a key role in:

- Creating **Docker images** for deployment
- Pushing images to **Docker Hub**
- Using **Docker Compose** for local service orchestration
- Preparing the project for **cloud deployment (GCP + Kubernetes)**

#### Docker Quick Reference:

🐋 Docker Quick Reference
Here's a list of useful Docker commands (great for refreshing your memory):

| Command                             | Description                                               |
| ----------------------------------- | --------------------------------------------------------- |
| `docker build -t name .`            | Build image from Dockerfile                               |
| `docker images`                     | List all local Docker images                              |
| `docker ps`                         | List running containers                                   |
| `docker ps -a`                      | List all containers (running & stopped)                   |
| `docker run -p 8080:80 image-name`  | Run a container and map ports                             |
| `docker run --rm -it image-name sh` | Run container interactively (with shell) + --rm           |
| `docker stop container-name`        | Stop a running container                                  |
| `docker rm container-name`          | Remove a stopped container                                |
| `docker rmi image-name`             | Delete an image                                           |
| `docker system prune`               | Delete all stopped containers, dangling images, and cache |

---

### Creating and Pushing Images to Docker Hub

We use **Docker** to containerize our frontend project, which lets us build and run the website consistently across environments.

#### Step 0: Log in to Docker Hub

```bash
docker login
```

You’ll be prompted to enter your Docker Hub username and password (or personal access token).

---

#### Step 1: Build the Image from Latest Source Code

To build a Docker image based on your current project files and Dockerfile:

```bash
docker build -t nkv2-frontend .
```

🧠 This command:

```md
- Uses the `Dockerfile` in the current directory (`.`)
- Tags the image as **`nkv2-frontend`** locally.
```

---

#### Step 2: Tag the Image

Docker Hub images must follow this format:

```php
<your-username>/<repo-name>:<tag>
```

```bash
docker tag nkv2-frontend <your-username>/nkv2-frontend:v1
```

**OR**

```bash
docker tag nkv2-frontend <your-username>/nkv2-frontend:latest
```

I am doing the latter, with **:latest** tag.

📝 My Docker Hub repo name is **not** the same as my project repo name on GitHub.

Side Note, **Tag** the image for **GCP**:

To be able to tag and then to push to GCP we first need to Authenticate Docker with Artifact Registry:

```bash
gcloud auth configure-docker <region>-docker.pkg.dev
```

```bash
docker tag <local-name> <registry-path>/<repo-name>/<image-name>:<tag>
```

---

#### Step 3: Push the Image to Docker Hub

```bash
docker push <your-username>/nkv2-frontend:latest
```

After pushing, you can verify and find your image at:
https://hub.docker.com/repositories

Side Note, **Push** the image to **GCP Artifact Registry**:

```bash
docker push <region>-docker.pkg.dev/<project-id>/<repository-name>/<image-name>:<tag>
```

---

### Docker Compose Integration

To interact with the **docker-compose-yaml** file, here are some useful commands:

```bash
docker compose up
```

🟢 Builds (if needed) and starts all services (in foreground)

```bash
docker compose up -d
```

🟢 Same as above, but runs in detached (background) mode

```bash
docker compose up --build
```

🔁 Forces a rebuild before starting

```bash
docker compose down
```

🛑 Stops and removes containers, networks, and volumes created

```bash
docker compose stop
```

🛑 Gracefully stops running services, but keeps containers for later

```bash
docker compose start
```

▶️ Restarts previously stopped containers

```bash
docker compose restart
```

🔄 Restarts containers (stop + start in one)

```bash
docker compose logs
```

📜 Shows logs from all containers

---
