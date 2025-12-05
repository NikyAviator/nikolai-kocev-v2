package controllers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/service"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/utils"
)

// CreateUserController creates a new user.
func CreateUserController(svc service.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var in domain.CreateUserInput
		if err := c.ShouldBindJSON(&in); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
			return
		}
		created, err := svc.CreateUser(c.Request.Context(), in)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, created)
	}
}

// DeleteOneUserController deletes a user by ID.
func DeleteOneUserController(svc service.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		if id == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "missing user id"})
			return
		}
		err := svc.DeleteUser(c.Request.Context(), id)
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
			return
		}
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.Status(http.StatusNoContent)
	}
}

// HÄR FIXA ANDRA PARAMETERN FÖR USERID som andra parameter
func LoginController(svc service.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var loginReq domain.LoginRequest
		if err := c.ShouldBindJSON(&loginReq); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
			return
		}
		err := svc.LoginUser(c.Request.Context(), loginReq)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		// FIXA TOKEN
		token, err := utils.GenerateToken(loginReq.Email, loginReq.UserId)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
			return
		}

		// Placeholder response for future implementation
		c.JSON(http.StatusOK, gin.H{"message": "credentials valid, Login successful", "token": token})
	}
}
