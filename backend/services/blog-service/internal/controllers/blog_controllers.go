package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/service"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/utils"
)

// CreateBlogController handles the creation of a new blog post.
func CreateBlogController(svc service.BlogService) gin.HandlerFunc {
	return func(c *gin.Context) {

		// Get token from Header
		token := c.Request.Header.Get("Authorization")

		// Check if token is empty
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "missing authorization token"})
			return
		}

		// Verify token
		err := utils.VerifyToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization token"})
			return
		}

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

// DeleteBlogController handles deleting a blog by ID.
func DeleteBlogController(svc service.BlogService) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		if id == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "missing blog id"})
			return
		}
		if err := svc.DeleteBlog(c.Request.Context(), id); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.Status(http.StatusNoContent)
	}
}

// DeleteAllBlogsController deletes all blogs (guarded by allowDestructive).
func DeleteAllBlogsController(svc service.BlogService, allowDestructive bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		if !allowDestructive {
			c.JSON(http.StatusForbidden, gin.H{"error": "destructive operations are not allowed"})
			return
		}
		n, err := svc.DeleteAllBlogs(c.Request.Context())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"deleted": n})
	}
}

// ListBlogsController returns all blogs.
func ListBlogsController(svc service.BlogService) gin.HandlerFunc {
	return func(c *gin.Context) {
		blogs, err := svc.ListBlogs(c.Request.Context())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, blogs)
	}
}

// GetBlogBySlugController returns a single blog by slug.
func GetBlogBySlugController(svc service.BlogService) gin.HandlerFunc {
	return func(c *gin.Context) {
		slug := c.Param("slug")
		if slug == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "missing blog slug"})
			return
		}
		blog, err := svc.ListBlogBySlug(c.Request.Context(), slug)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, blog)
	}
}
