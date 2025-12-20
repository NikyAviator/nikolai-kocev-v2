package middleware

import (
	"context"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/env"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserReader interface {
	FindByID(ctx context.Context, id primitive.ObjectID) (*domain.User, error)
	FindByEmail(ctx context.Context, email string) (*domain.User, error)
}

func CheckThatClaimsIsAdmin(users UserReader) gin.HandlerFunc {

	adminEmail := env.GetString("ADMIN_EMAIL", "")

	return func(c *gin.Context) {
		// Just a placeholder for future claims-related middleware.
		c.Next()
	}
}

/*
// internal/middleware/claims.go
package middleware

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/env"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/utils" // VerifyToken()
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
)

// Small interface so you can pass either your service or repo:
type UserReader interface {
	FindByID(ctx context.Context, id primitive.ObjectID) (*domain.User, error)
	FindByEmail(ctx context.Context, email string) (*domain.User, error)
}

// Context keys
const (
	CtxUserIDKey = "userID"
	CtxEmailKey  = "email"
)

// CheckThatClaimsIsAdmin verifies the JWT, checks that the user exists in DB,
// and (optionally) enforces ADMIN_EMAIL if set.
func CheckThatClaimsIsAdmin(users UserReader) gin.HandlerFunc {
	adminEmail := env.GetString("ADMIN_EMAIL", "") // leave empty to skip the hard “only this email” check

	return func(c *gin.Context) {
		token := extractBearer(c.GetHeader("Authorization"))
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing bearer token"})
			return
		}

		claims, err := utils.VerifyToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}

		// Pull email (required) and userId (optional) from claims
		email, ok := claims["email"].(string)
		if !ok || email == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "token missing email"})
			return
		}
		userIDStr, _ := claims["userId"].(string)

		// If you want single-operator mode, enforce ADMIN_EMAIL here
		if adminEmail != "" && !strings.EqualFold(adminEmail, email) {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "not allowed"})
			return
		}

		// Check DB to ensure the user actually exists
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
			// Fallback by email
			u, err := users.FindByEmail(ctx, email)
			if err != nil || u == nil {
				c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "unknown user"})
				return
			}
			usr = u
		}
		// Cross-check email to avoid stale tokens
		if !strings.EqualFold(usr.Email, email) {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "email mismatch"})
			return
		}

		// Stash identity for controllers/services that need it
		c.Set(CtxUserIDKey, usr.ID.Hex())
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



*/
