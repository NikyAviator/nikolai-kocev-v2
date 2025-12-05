package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/utils"
)

func Authenticate(c *gin.Context) {
	// Get token from Header
	token := c.Request.Header.Get("Authorization")

	// Check if token is empty
	if token == "" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing authorization token"})
		return
	}

	// Verify token (returns err for now, but userId and email can be extracted later)
	err := utils.VerifyToken(token)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization token"})
		return
	}

	c.Next()
}
