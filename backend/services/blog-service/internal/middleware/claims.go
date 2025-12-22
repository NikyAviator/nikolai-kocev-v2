package middleware

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/infrastructure/repository"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/env"
)

// RequireAdmin ensures the caller is your configured admin (and exists in DB).
func RequireAdmin(userRepo repository.UserRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		email, _ := c.Get("email")
		userID, _ := c.Get("userId")

		adminEmail := env.GetString("ADMIN_EMAIL", "")
		if email == nil || userID == nil || adminEmail == "" || email.(string) != adminEmail {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "admin required"})
			return
		}

		// Optional—but good—to confirm the token points to a real user in DB.
		ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
		defer cancel()

		u, err := userRepo.FindByEmail(ctx, email.(string))
		if err != nil || u == nil {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "admin not found"})
			return
		}
		// If you also want to verify the ID matches:
		// if u.ID.Hex() != userID.(string) {
		// 	c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "admin ID mismatch"})
		// 	return
		// }

		c.Next()
	}
}
