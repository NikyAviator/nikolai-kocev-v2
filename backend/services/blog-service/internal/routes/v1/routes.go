// internal/routes/v1/routes.go
package v1

import (
	"net/http"
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
	api := r.Group("/api")

	// Health
	api.GET("/healthz", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"ok": true}) })

	api.Use(opts.MW.ApiSharedSecret)
	// Public blog routes
	api.GET("/blogs", controllers.ListBlogsController(blogSvc))
	api.GET("/blogs/:slug", controllers.GetBlogBySlugController(blogSvc))

	// Auth
	api.POST("/login", controllers.LoginController(userSvc))

	// Optional: self-service registration
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
	admin.POST("/blogs", controllers.CreateBlogController(blogSvc))
	// admin.PUT("/blogs/:id", controllers.UpdateBlogController(blogSvc)) Future path
	admin.DELETE("/blogs/:id", controllers.DeleteBlogController(blogSvc))
	if opts.AllowDestructive {
		admin.DELETE("/blogs", controllers.DeleteAllBlogsController(blogSvc))
	}

	// User management (example)
	admin.DELETE("/users/:id", controllers.DeleteOneUserController(userSvc))
}
