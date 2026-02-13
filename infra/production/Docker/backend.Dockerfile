# Dockerfile for production blog-service
# Build stage
FROM golang:1.25 AS builder

WORKDIR /build

# Cache deps
COPY go.mod go.sum ./
RUN go mod download

# Copy shared code and the service
COPY services/blog-service ./services/blog-service
COPY shared ./shared

# Build the blog-service binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -ldflags="-w -s" \
    -o ./services/blog-service/bin/blog-service \
    ./services/blog-service/cmd/main.go


# Runtime stage
FROM gcr.io/distroless/static:nonroot

COPY --from=builder /build/services/blog-service/bin/blog-service /blog-service
EXPOSE 5000
USER nonroot:nonroot
ENTRYPOINT ["/blog-service"]