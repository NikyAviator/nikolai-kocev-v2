package middleware

import "github.com/gin-gonic/gin"

func CheckThatClaimsIsAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Just a placeholder for future claims-related middleware.
		c.Next()
	}
}
