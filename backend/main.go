package main

import (
	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/middlewares"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/models"
)

func main() {
	server := gin.Default()

	api := server.Group("/api")
	// GET
	api.GET("/health", getHealth)
	api.GET("/blogs", getBlogs)
	// POST
	api.POST("/blogs", middlewares.Authenticate, createBlog)

	server.Run(":5000") // localhost:5000

}

func getHealth(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Hello, my little gopher. Everything is OK!"})
}

func getBlogs(c *gin.Context) {
	blogs := models.GetAllBlogs()
	c.JSON(200, blogs)
}

func createBlog(c *gin.Context) {

	var blog models.Blog
	err := c.ShouldBindJSON(&blog)

	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	userId := c.GetInt64("userId")
	blog.ID = userId
	blog.Save()
	c.JSON(201, gin.H{"message": "Blog created successfully!"})

}
