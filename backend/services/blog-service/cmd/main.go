package main

import (
	"context"
	"log"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/infrastructure/repository"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/middleware"
	v1 "github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/routes/v1"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/service"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/env"
	sharedmongo "github.com/nikyaviator/nikolai-kocev-v2/backend/shared/mongo"
)

func main() {
	// Config
	mongoURI := env.GetString("MONGODB_URI", "mongodb://localhost:27017")
	dbName := env.GetString("MONGODB_DBNAME", "nkv2")
	port := env.GetString("PORT", "5000")
	allowDestructive := env.GetBool("ALLOW_DESTRUCTIVE", false)
	registrationOpen := env.GetBool("REGISTRATION_OPEN", false)
	authenticationMiddleware := middleware.Authenticate() // this is not a config, has to be moved

	// Mongo connect
	_, db, closeMongo, err := sharedmongo.ConnectMongoDB(context.Background(), sharedmongo.MongoConfig{
		URI:         mongoURI,
		DBName:      dbName,
		ConnTimeout: 10 * time.Second,
	})
	if err != nil {
		log.Fatal("mongo connect:", err)
	}
	defer func() { _ = closeMongo(context.Background()) }()

	// DI: repos -> services
	blogRepo := repository.NewMongoBlogRepository(db)
	userRepo := repository.NewMongoUserRepository(db)

	// Ensure indexes
	if err := blogRepo.EnsureIndexes(context.Background()); err != nil {
		log.Fatal("ensure blog indexes:", err)
	}
	if err := userRepo.EnsureIndexes(context.Background()); err != nil {
		log.Fatal("ensure user indexes:", err)
	}

	blogSvc := service.NewBlogService(blogRepo)
	userSvc := service.NewUserService(userRepo)

	// HTTP
	r := gin.Default()
	v1.Register(r, blogSvc, userSvc, v1.Options{
		AllowDestructive: allowDestructive,
		RegistrationOpen: registrationOpen,
		AuthMiddleware:   authenticationMiddleware,
	})
	log.Printf("blog-service listening on :%s", port)
	log.Fatal(r.Run(":" + port))
}
