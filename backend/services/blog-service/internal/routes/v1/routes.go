package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/controllers"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/service"
)

// Register wires versioned routes under /api.
func Register(r *gin.Engine, blogSvc service.BlogService, userSvc service.UserService, allowDestructive bool) {
	api := r.Group("/api")
	{
		// Health
		api.GET("/healthz", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"ok": true}) })

		// Blogs (public)
		api.GET("/blogs", controllers.ListBlogsController(blogSvc))
		api.GET("/blogs/:slug", controllers.GetBlogBySlugController(blogSvc))

		// Blogs (protected/destructive – auth can be added later via middleware)
		api.POST("/blogs", controllers.CreateBlogController(blogSvc))
		api.DELETE("/blogs/:id", controllers.DeleteBlogController(blogSvc))
		api.DELETE("/blogs", controllers.DeleteAllBlogsController(blogSvc, allowDestructive))

		// Users
		api.POST("/users", controllers.CreateUserController(userSvc))
		api.DELETE("/users/:id", controllers.DeleteOneUserController(userSvc))

		// // Auth (future)
		api.POST("/login", controllers.LoginController(userSvc))
	}
}
