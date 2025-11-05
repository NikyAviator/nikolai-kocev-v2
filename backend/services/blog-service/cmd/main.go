package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/env"
	bbmongo "github.com/nikyaviator/nikolai-kocev-v2/backend/shared/mongo"
)

func main() {
	fmt.Printf("STARTING blog-service/cmd/main.go")

	// Load envs from kbctl secret (if available)
	// MONGODB_URI, MONGODB_DB
	cfg := bbmongo.Config{
		URI:         env.GetString("MONGODB_URI", ""),
		DBName:      env.GetString("MONGODB_DB", ""),
		ConnTimeout: 10 * time.Second,
	}
	_, db, closeFn, err := bbmongo.ConnectMongoDB(context.Background(), cfg)
	if err != nil {
		log.Fatalf("mongo connect failed: %v", err)
	}
	defer func() {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := closeFn(ctx); err != nil {
			log.Printf("mongo disconnect error: %v", err)
		}
	}()

	// ---- Gin wiring ----
	r := gin.Default()

	// Health endpoint (verifies DB by listing collections quickly)
	r.GET("/healthz", func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), 2*time.Second)
		defer cancel()
		_, err := db.ListCollectionNames(ctx, struct{}{})
		if err != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"status": "degraded", "error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	log.Println("blog-service listening on :5000")
	if err := r.Run(":5000"); err != nil {
		log.Fatal(err)
	}
}
