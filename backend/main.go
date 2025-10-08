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
	uri := os.Getenv("MONGO_URI")
	dbName := os.Getenv("MONGO_DB")
	port := os.Getenv("PORT")

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
