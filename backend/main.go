package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/db"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/routes"
)

func main() {
	uri := getenv("MONGO_URI", "mongodb://localhost:27017")
	dbName := getenv("MONGO_DB", "nikysite")
	port := getenv("PORT", "5000")

	// connect DB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, store, err := db.Connect(ctx, uri, dbName)
	if err != nil {
		log.Fatalf("mongo: %v", err)
	}
	defer client.Disconnect(context.Background())

	// routes
	r := gin.Default()
	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) { c.JSON(200, gin.H{"ok": true}) })
		api.GET("/blogs", routes.ListBlogs(store))
		api.POST("/seed", routes.SeedBlogs(store)) // dev-only
	}

	log.Printf("listening on :%s", port)
	log.Fatal(r.Run(":" + port))
}

func getenv(k, d string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return d
}
