package middleware

import (
	"context"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/env"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserReader interface {
	FindByID(ctx context.Context, id primitive.ObjectID) (*domain.User, error)
	FindByEmail(ctx context.Context, email string) (*domain.User, error)
}

// Context keys
const (
	CtxUserIDKey = "userID"
	CtxEmailKey  = "email"
)

func CheckThatClaimsIsAdmin(users UserReader) gin.HandlerFunc {

	adminEmail := env.GetString("ADMIN_EMAIL", "")

	return func(c *gin.Context) {
		token := extractBearer(c.GetHeader("Authorization"))
		if token == "" {
			c.AbortWithStatusJSON(401, gin.H{"error": "missing bearer token"})
			return
		}

		claims, err := utils.VerifyToken(token)
		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
			return
		}

		email, ok := claims["email"].(string)
		if !ok || email == "" {
			c.AbortWithStatusJSON(401, gin.H{"error": "token missing email"})
			return
		}
		userIDStr, _ := claims["userId"].(string)

		if adminEmail != "" && !strings.EqualFold(adminEmail, email) {
			c.AbortWithStatusJSON(403, gin.H{"error": "not allowed"})
			return
		}

		ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
		defer cancel()

		var usr *domain.User
		if userIDStr != "" {
			if oid, err := primitive.ObjectIDFromHex(userIDStr); err == nil {
				if u, err := users.FindByID(ctx, oid); err == nil && u != nil {
					usr = u
				}
			}
		}
		if usr == nil {
			u, err := users.FindByEmail(ctx, email)
			if err != nil || u == nil {
				c.AbortWithStatusJSON(403, gin.H{"error": "unknown user"})
				return
			}
			usr = u
		}
		if !strings.EqualFold(usr.Email, email) {
			c.AbortWithStatusJSON(403, gin.H{"error": "email mismatch"})
			return
		}

		c.Set(CtxUserIDKey, usr.ID)
		c.Set(CtxEmailKey, usr.Email)
		c.Next()
	}
}

func extractBearer(h string) string {
	if h == "" {
		return ""
	}
	parts := strings.SplitN(h, " ", 2)
	if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
		return ""
	}
	return parts[1]
}
