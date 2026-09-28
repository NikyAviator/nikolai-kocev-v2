# Send built images to minikube's own in-cluster registry (enabled via
# `minikube addons enable registry`) instead of Docker Hub. Needed because
# the cluster's runtime is containerd, not docker — containerd can't see
# images sitting in the host's Docker daemon, so they have to actually be
# pulled from somewhere. See it-business/tools/k8s/k8s.md for the full
# explanation of why.
default_registry('localhost:5000')

# --- Docker Builds ---
docker_build(
    ref='backend-image',
    context='./backend',
    dockerfile='infra/development/Docker/backend.Dockerfile',
)

docker_build(
    ref='frontend-image',
    context='.',
    dockerfile='infra/development/Docker/frontend.Dockerfile',
)

allow_k8s_contexts('minikube')

# --- K8s resources ---
k8s_yaml([
    'infra/development/K8s/frontend-deployment.yaml',
    'infra/development/K8s/frontend-service.yaml',
    'infra/development/K8s/backend-deployment.yaml',
    'infra/development/K8s/backend-service.yaml',
    'infra/development/K8s/ingress.yaml',

])

# --- Tilt UX ---
k8s_resource('frontend', port_forwards=[])
k8s_resource('backend', port_forwards=[])

# Run ingress port-forward as a background process owned by Tilt
local_resource(
  'ingress-pf',
  serve_cmd='kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 8080:80',
  allow_parallel=True,
)

# Tunnels localhost:5000 (where `docker push` sends built images) to the
# in-cluster registry Service. The cluster's own containerd pulls the same
# `localhost:5000/...` reference via the registry-proxy DaemonSet, which
# listens on each node's own local port 5000 — same address, two different
# local processes, each valid from its own side. See k8s.md for why this
# works.
local_resource(
  'registry-pf',
  serve_cmd='kubectl -n kube-system port-forward svc/registry 5000:80',
  allow_parallel=True,
)