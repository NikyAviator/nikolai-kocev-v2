package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	// shared helpers (env + mongo)
	env2 "github.com/nikyaviator/nikolai-kocev-v2/backend/shared/env"
	mongo2 "github.com/nikyaviator/nikolai-kocev-v2/backend/shared/mongo"

	// blog layers
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/infrastructure/repository"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/service"
)

func main() {
	// 1) Config
	mongoURI := env2.GetString("MONGODB_URI", "mongodb://localhost:27017")
	dbName := env2.GetString("MONGODB_DBNAME", "nkv2")
	port := env2.GetString("PORT", "5000") // blog service port

	// 2) Connect Mongo (returns client, db, and a cleanup function)
	_, db, closeMongo, err := mongo2.ConnectMongoDB(context.Background(), mongo2.MongoConfig{
		URI:         mongoURI,
		DBName:      dbName,
		ConnTimeout: 10 * time.Second,
	})
	if err != nil {
		log.Fatal("mongo connect:", err)
	}
	defer func() { _ = closeMongo(context.Background()) }()

	// 3) DI: repo -> service
	repo := repository.NewMongoBlogRepository(db)
	svc := service.NewBlogService(repo)

	// 4) HTTP
	r := gin.Default()
	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) { c.JSON(200, gin.H{"ok": true}) })
		api.POST("/blogs", createBlogHandler(svc))
	}

	log.Printf("blog-service listening on :%s", port)
	log.Fatal(r.Run(":" + port))
}

func createBlogHandler(svc service.BlogService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var in domain.CreateBlogInput
		if err := c.ShouldBindJSON(&in); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
			return
		}

		created, err := svc.CreateBlog(c.Request.Context(), in)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, created)
	}
}
