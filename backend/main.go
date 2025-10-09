package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/db"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/routes"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	uri := os.Getenv("MONGODB_URI")       // mongodb://localhost:27017/
	port := os.Getenv("PORT")             // 5000
	dbName := os.Getenv("MONGODB_DBNAME") // nkv2

	// docs is just a string with a link to the docs
	docs := "www.mongodb.com/docs/drivers/go/current/"
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable. " +
			"See: " + docs +
			"usage-examples/#environment-variable")
	}

	// Create context with timeout - BETTER APPROACH
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	// Create database reference (store)
	mongoDB := client.Database(dbName)
	store := db.NewStore(mongoDB) // Wrap mongoDB in your *db.Store type

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
