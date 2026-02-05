# Dockerfile for production blog-service
# Build stage
FROM golang:1.25 AS builder

WORKDIR /build

# Copy backend files (when building from project root)
COPY go.mod go.sum ./
RUN go mod download

COPY backend/services/blog-service ./services/blog-service
COPY backend/shared ./shared

RUN CGO_ENABLED=0 GOOS=linux go build -o ./services/blog-service/bin/blog-service ./services/blog-service/cmd/main.go

# Runtime stage
FROM gcr.io/distroless/static:nonroot

COPY --from=builder /build/services/blog-service/bin/blog-service /blog-service
EXPOSE 5000
USER nonroot:nonroot
ENTRYPOINT ["/blog-service"]