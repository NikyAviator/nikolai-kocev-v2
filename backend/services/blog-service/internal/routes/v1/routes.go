// internal/routes/v1/routes.go
package v1

import (
	"time"

	"github.com/gin-gonic/gin"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/controllers"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/middleware"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/service"
)

type Options struct {
	AllowDestructive bool
	RegistrationOpen bool
	MW               middleware.Set
	AdminEmail       string
	ApiSharedSecret  string
}

func Register(
	r *gin.Engine,
	blogSvc service.BlogService,
	userSvc service.UserService,
	opts Options,
) {
	// Base API group
	api := r.Group("/api")

	// Internal API protection (Call needs to originate from frontend with secret)
	api.Use(opts.MW.ApiSharedSecret)
	// Public blog routes
	api.GET("/blog", controllers.ListBlogsController(blogSvc))
	api.GET("/blog/:slug", controllers.GetBlogBySlugController(blogSvc))

	// Auth
	api.POST("/login", controllers.LoginController(userSvc))

	// Create - User. Does not use X-API-Shared-Secret but is protected by registration open flag.
	if opts.RegistrationOpen {
		api.POST("/users", controllers.CreateUserController(userSvc))
	}

	// Protected/admin routes
	admin := api.Group("/admin")
	admin.Use(
		opts.MW.Timeout(10*time.Second),
		opts.MW.Authn,
		opts.MW.AdminOnly,
	)

	// Blog management
	admin.POST("/blog", controllers.CreateBlogController(blogSvc))
	// admin.PUT("/blog/:id", controllers.UpdateBlogController(blogSvc)) Future path
	admin.DELETE("/blog/:id", controllers.DeleteBlogController(blogSvc))
	if opts.AllowDestructive {
		admin.DELETE("/blog", controllers.DeleteAllBlogsController(blogSvc))
	}

	// User management (example)
	admin.DELETE("/users/:id", controllers.DeleteOneUserController(userSvc))
}
