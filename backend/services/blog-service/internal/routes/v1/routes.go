package v1

import (
	"github.com/gin-gonic/gin"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/controllers"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/middleware"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/service"
)

func Register(
	r *gin.Engine,
	blogSvc *service.BlogService,
	userSvc *service.UserService,
	allowDestructive bool,
	registrationOpen bool,
	authenticationMiddleware gin.HandlerFunc,
) {
	bc := // how do I route these controllers? TO ALL OF THEM?

	api := r.Group("/api")

	// Public
	api.GET("/healthz", blogController.Healthz)
	api.GET("/blogs", blogController.ListBlogs)
	api.GET("/blogs/:slug", blogController.GetBySlug)
	api.POST("/login", uc.Login)

	// Optional: registration window
	if registrationOpen {
		api.POST("/users", userController.CreateUser)
	}

	// Private group
	priv := api.Group("")
	priv.Use(authenticationMiddleware)

	priv.POST("/blogs", bc.CreateBlog)
	priv.PATCH("/blogs/:id", bc.UpdateBlog)
	priv.DELETE("/blogs/:id", bc.DeleteBlog)

	if allowDestructive {
		priv.DELETE("/blogs", bc.DeleteAllBlogs)
	}
}
