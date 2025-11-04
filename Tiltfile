# --- Docker Builds ---
docker_build(
    ref='frontend-image',
    context='frontend',
    dockerfile='infra/development/Docker/frontend.Dockerfile',
)

allow_k8s_contexts('minikube')

# --- K8s resources ---
k8s_yaml([
    'infra/development/K8s/frontend-deployment.yaml',
    'infra/development/K8s/frontend-service.yaml',
])

# --- Tilt UX ---
k8s_resource('frontend', port_forwards=['8080:8080'])