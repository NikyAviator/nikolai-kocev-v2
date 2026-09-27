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
- Vite

**Back end:**

- Go
- Gin
- MongoDB

**DevOps**

- Bash
- Docker
- Kubernetes
- Tilt (K8s for local dev)
- Hosting via GCP (Google Cloud Platform with: Cloud - Triggers -> Build -> Run)

---

### Running in Development

For development environment we use a Tiltfile and Minikube for hosting of our K8s.

To start our cluster, make sure you meet the following prerequisites:

### Prerequisites:

| Tool                                                       | Purpose                                     | Check version              |
| ---------------------------------------------------------- | ------------------------------------------- | -------------------------- |
| [Docker Desktop](https://www.docker.com/) or Docker Engine | Container runtime used by Minikube and Tilt | `docker --version`         |
| [Minikube](https://minikube.sigs.k8s.io/docs/)             | Local single-node Kubernetes cluster        | `minikube version`         |
| [kubectl](https://kubernetes.io/docs/tasks/tools/)         | Kubernetes CLI                              | `kubectl version --client` |
| [Tilt](https://docs.tilt.dev/install.html)                 | Local dev orchestrator                      | `tilt version`             |

---

Before starting stuff, check current docker context & other nice commands:

```bash
docker context ls # To check
docker context use default # To switch (I prefer native dockerd (/run/docker.sock))
docker info # check the stuff you running
```

I recommend setting the following resources in your minikube VM:

```bash
minikube config set driver docker
minikube config set cpus 2
minikube config set memory 4096
minikube config set disk-size 20g
minikube config view # To check the set resources
minikube start
```

#### Switching driver to `kvm2` (only if `docker` breaks)

`docker` is the default and normally "just works" — same kernel as the host,
images build straight into minikube, no extra setup. Only switch to `kvm2`
if you hit a specific bug: pods can't reach `10.96.x.x` (the K8s API
ClusterIP), new pod-to-Service connections time out, or
`minikube addons enable ingress` hangs forever on "Verifying ingress
addon...". That's a real, seen-before issue tied to how the `docker` driver
shares the host's kernel — `kvm2` gives the node its own separate kernel,
sidestepping it entirely.

**What changes with `kvm2`, in short:**

1. **The node becomes a real VM**, not a container sharing your host's
   Docker daemon — so it can no longer see images you `docker build`
   locally. `tilt up` will fail with `docker push: ... denied: requested
access to the resource is denied` (it's trying to push to Docker Hub's
   reserved `library/` namespace by default). **Fix:** run
   `minikube addons enable registry`, then add to the Tiltfile:

   ```python
   default_registry('localhost:5000')
   local_resource('registry-pf',
     serve_cmd='kubectl -n kube-system port-forward svc/registry 5000:80',
     allow_parallel=True)
   ```

   (mirrors the existing `ingress-pf` port-forward pattern below.)

2. **`kvm2` needs its own driver binary + `libvirtd` running** — not
   installed by default:

   ```bash
   yay -S docker-machine-driver-kvm2
   sudo systemctl enable --now libvirtd
   ```

3. **`kvm2` creates its own libvirt network**, separate from any existing
   VM setup (e.g. `virbr0`) — usually `virbr1`. If `minikube start` creates
   the VM but it never gets an IP (`didn't return IP after 1m30s`), your
   firewall doesn't know about this new bridge yet. Check
   `virsh net-list --all` for the actual bridge name, then (UFW example):
   ```bash
   sudo ufw allow in on virbr1 to any port 67 proto udp comment "minikube kvm2 DHCP"
   sudo ufw allow in on virbr1 to any port 53 proto udp comment "minikube kvm2 DNS"
   sudo ufw allow in on virbr1 to any port 53 proto tcp comment "minikube kvm2 DNS"
   sudo ufw reload
   ```
   Full writeup of both driver bugs, how they were diagnosed, and why:
   `it-business/Linux/Arch/vm-networking/networking-vms.md`, section 10.

```bash
minikube delete --all --purge   # required before switching driver
minikube config set driver kvm2
minikube config set cpus 4
minikube config set memory 8192
minikube config set disk-size 20g
minikube config view   # verify
minikube start
```

To switch back to `docker` later: `minikube delete --all --purge`, then
`minikube config set driver docker` and `minikube start` again — and remove
the `default_registry(...)`/`registry-pf` lines from the Tiltfile, since
`docker` doesn't need them.

---

Then enable ingress addons in minikube:

```bash
minikube addons enable ingress
```

We need to have the env file created so that we can run the program:

To create a **Secret** (dev only, and path added to .gitignore):

(https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kubectl/)

```bash
kubectl create secret generic blog-service-env \
  --from-env-file=infra/development/secrets/blog-service.env
```

To update later, just delete and create it again:

```bash
kubectl delete secret blog-service-env
```

To check that it is created from correct file & Security Header check

```bash
kubectl get secret blog-service-env -o
kubectl exec -it <backend-pod-name> -- env | grep API_SHARED_SECRET
```

---

### Scripts

To get a clear snapshot of any project you are working on, use:

```bash
tree -I 'node_modules|.git|dist' -a -L 10
```

To update **ALL** dependencies in the project, cd inte **/scripts** folder and run:

```bash
./update-all.sh
```

## DevOps

### Handy DevOps commands for local dev:

From the **repo root**, simply run (and do not forget to have your minikube instance running):

```bash
tilt up
```

### Stopping / Cleaning Up

When you’re done and other minikube commands:

```bash
tilt down      # stops all Tilt resources
minikube stop  # shuts down the cluster (keeps data)
---
minikube config view # resources
minikube status
minikube profile list
minikube --help
```

or to nuke everything, use:

```bash
minikube delete --all --purge   # removes the cluster completely
```

but only when:

- Changed driver / core config (e.g. switched from Docker Desktop to native Docker)

- Changed CPU/memory/disk size in a way that requires fresh node

- The cluster is completely borked and not worth debugging

###

To recreate stale pods:

```bash
tilt down
kubectl get all
kubectl get pods
kubectl delete pod --all
tilt up
---
tilt logs -f
```
