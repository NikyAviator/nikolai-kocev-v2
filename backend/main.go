package main

import (
	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/models"
)

func main() {
	server := gin.Default()

	api := server.Group("/api")

	api.GET("/health", getHealth)
	api.GET("/blogs", getBlogs)

	server.Run(":5000") // localhost:5000

}

func getHealth(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Hello, my little gopher. Everything is OK!"})
}

func getBlogs(c *gin.Context) {
	blogs := models.GetAllBlogs()
	c.JSON(200, blogs)
}
