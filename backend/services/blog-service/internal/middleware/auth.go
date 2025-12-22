package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/utils"
)

// AuthenticateJWT verifies the Bearer token and sets claims, email and userId into context.
func AuthenticateJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		h := c.GetHeader("Authorization")
		if !strings.HasPrefix(h, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing bearer token"})
			return
		}
		raw := strings.TrimPrefix(h, "Bearer ")
		claims, err := utils.VerifyToken(raw) // returns jwt.MapClaims
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}

		c.Set("claims", claims)

		if v, ok := claims["email"].(string); ok {
			c.Set("email", v)
		}

		if v, ok := claims["userId"].(string); ok {
			c.Set("userId", v)
		}

		c.Next()
	}
}
