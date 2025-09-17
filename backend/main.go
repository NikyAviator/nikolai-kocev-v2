package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()

	api := server.Group("/api")

	api.GET("/health", getHealth)

	server.Run(":5000") // localhost:5000

}

func getHealth(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Hello, my little gopher. Everything is OK!"})
}
