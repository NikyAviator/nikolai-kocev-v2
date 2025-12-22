// internal/middleware/auth.go
package middleware

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/service"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/utils"
)

// Set bundles the handlers so we can DI them.
type Set struct {
	Authn     gin.HandlerFunc // validates JWT, puts claims into context
	AdminOnly gin.HandlerFunc // ensures the caller is your admin in DB
	Timeout   func(d time.Duration) gin.HandlerFunc
}

// NewSet wires middleware with dependencies (e.g., userSvc) once.
func NewSet(userSvc service.UserService, adminEmail string) Set {
	// 1) Authn: verify token and stash claim values on the context
	authn := func(c *gin.Context) {
		h := c.GetHeader("Authorization")
		if !strings.HasPrefix(h, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing bearer token"})
			return
		}
		raw := strings.TrimPrefix(h, "Bearer ")
		claims, err := utils.VerifyToken(raw) // returns jwt.MapClaims (email, userId, exp, …)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}
		if v, ok := claims["email"].(string); ok {
			c.Set("userEmail", v)
		}
		if v, ok := claims["userId"].(string); ok {
			c.Set("userId", v)
		}
		c.Next()
	}

	// 2) AdminOnly: confirm the token subject is your admin user in DB
	adminOnly := func(c *gin.Context) {
		email := c.GetString("userEmail")
		id := c.GetString("userId")
		if email == "" || id == "" {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "missing claims"})
			return
		}
		// Fast path: require email to match your configured admin
		if email != adminEmail {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "not admin"})
			return
		}
		// // Optional extra check: ensure this user exists in DB
		// _, err := userSvc.FindByID(c.Request.Context(), id)
		// if err != nil {
		// 	c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "unknown user"})
		// 	return
		// }
		c.Next()
	}

	// 3) Timeout: wrap each request in a deadline
	timeout := func(d time.Duration) gin.HandlerFunc {
		return func(c *gin.Context) {
			ctx, cancel := context.WithTimeout(c.Request.Context(), d)
			defer cancel()
			c.Request = c.Request.WithContext(ctx)
			c.Next()
			if ctx.Err() == context.DeadlineExceeded && !c.IsAborted() {
				c.AbortWithStatusJSON(http.StatusGatewayTimeout, gin.H{"error": "request timed out"})
			}
		}
	}

	return Set{Authn: authn, AdminOnly: adminOnly, Timeout: timeout}
}
