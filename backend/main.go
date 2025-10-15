package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/db"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/routes"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// 1) Load .env (optional in prod; essential in local dev)
	_ = godotenv.Load(".env")

	// 2) Read env with fallbacks so local dev "just works"
	uri := getenv("MONGODB_URI", "mongodb://localhost:27017/")
	dbName := getenv("MONGODB_DBNAME", "nkv2")
	port := getenv("PORT", "5000")

	// 3) Connect to Mongo with a bounded 10 second context
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.Background())

	database := client.Database(dbName)

	// 4) Build our typed Store (collections + indexes)
	store, err := db.NewStore(database)
	if err != nil {
		panic(err)
	}

	// 5) HTTP wiring
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

// getenv reads an environment variable or returns the provided default.
func getenv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
