## Table of Contents

- [My Tech Stack](#my-tech-stack)
- [Running in Development](#running-in-development)
- [Scripts](#scripts)
- [DevOps](#devops)

---

### NKV2

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
- Kubernetes
- Tilt
- GCP (Google Cloud Platform with K8s)

---

### Running in Development

## **TODO INSTALL ALL DEPS Node & GO Bash Script on fresh git clone**

---

To run **frontend**, cd into frontend and:

```bash
npm run dev
```

- Frontend (Vite: React & JS) will run on http://localhost:5173/

To run **backend**

From the root folder, run:

1.  To create & run blog-service binary:

```bash
# from repo root
docker build -f infra/development/Docker/blog-service.Dockerfile -t blog-service ./backend
docker run --rm -p 5000:5000 blog-service
```

- Backend (GO) will run on http://localhost:5000/
- any calls to /api/\* on **5173** from the front end will be forwarded to the GO backend at port **5000**.

To create a **Secret** (dev only, and path added to .gitignore):

(https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kubectl/)

```bash
kubectl create secret generic blog-service-env \
  --from-env-file=infra/development/secrets/blog-service.env
```

To update later:

```bash
kubectl delete secret blog-service-env
kubectl create secret generic blog-service-env \
  --from-env-file=infra/development/secrets/blog-service.env
```

---

### Scripts

To get a clear snapshot of any project you are working on, use:

```bash
tree -I 'node_modules|.git|dist' -a -L 10
```

## DevOps

We will use Tilt (https://tilt.dev/) to orchestrate local builds and deployments on a Kubernetes cluster via Minikube.

---

### Prerequisites:

| Tool                                                       | Purpose                                     | Check version              |
| ---------------------------------------------------------- | ------------------------------------------- | -------------------------- |
| [Docker Desktop](https://www.docker.com/) or Docker Engine | Container runtime used by Minikube and Tilt | `docker --version`         |
| [Minikube](https://minikube.sigs.k8s.io/docs/)             | Local single-node Kubernetes cluster        | `minikube version`         |
| [kubectl](https://kubernetes.io/docs/tasks/tools/)         | Kubernetes CLI                              | `kubectl version --client` |
| [Tilt](https://docs.tilt.dev/install.html)                 | Local dev orchestrator                      | `tilt version`             |

---

### 🧰 Running the Project with Tilt

From the **repo root**, simply run (and do not forget to have your minikube instance running):

```bash
tilt up
```

This will:

1. **Build** the frontend Docker image using
   infra/development/Docker/frontend.Dockerfile
   with the context set to the frontend/ folder.

2. **Deploy** the Kubernetes resources defined in
   infra/development/K8s/frontend.yaml (Deployment) and
   infra/development/K8s/frontend-service.yaml (Service).

3. **Port-forward port** `8080` from the cluster to your local machine.

4. Watch for file changes in the frontend/ directory — Tilt will rebuild and redeploy automatically.

---

### 🧹 Stopping / Cleaning Up

When you’re done:

```bash
tilt down      # stops all Tilt resources
minikube stop  # shuts down the cluster (keeps data)
# or
minikube delete --all --purge   # removes the cluster completely
```
