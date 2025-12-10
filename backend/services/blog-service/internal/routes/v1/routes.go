package v1

import (
	"github.com/gin-gonic/gin"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/controllers"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/service"
)

// internal/routes/v1/routes.go
func Register(
	r *gin.Engine,
	blogSvc *service.BlogService,
	userSvc *service.UserService,
	allowDestructive bool,
	registrationOpen bool, // <— new flag
	authenticationMiddleware gin.HandlerFunc,
) {

	bc := controllers.NewBlogController(blogSvc)
	uc := controllers.NewUserController(userSvc)

	api := r.Group("/api")

	// Public
	api.GET("/healthz", bc.Healthz)
	api.GET("/blogs", bc.ListBlogs)
	api.GET("/blogs/:slug", bc.GetBySlug)
	api.POST("/login", uc.Login)

	if registrationOpen {
		api.POST("/users", uc.CreateUser) // only while open
	}

	// Private
	priv := api.Group("")
	priv.Use(authenticationMiddleware)

	priv.POST("/blogs", bc.CreateBlog)
	priv.PATCH("/blogs/:id", bc.UpdateBlog)
	priv.DELETE("/blogs/:id", bc.DeleteBlog)

	if allowDestructive {
		priv.DELETE("/blogs", bc.DeleteAllBlogs)
	}

	// Example user management
	// priv.DELETE("/users/:id", uc.DeleteUser)
}
