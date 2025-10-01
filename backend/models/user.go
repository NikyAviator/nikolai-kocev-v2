package models

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/models"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"  json:"id"`
	Username  string             `bson:"username"      json:"username" binding:"required"`
	Email     string             `bson:"email"         json:"email" binding:"required,email"`
	Password  string             `bson:"password"      json:"password" binding:"required,min=6"`
	CreatedAt time.Time          `bson:"createdAt"     json:"createdAt"`
	UpdatedAt time.Time          `bson:"updatedAt"     json:"updatedAt"`
}

var users = []User{}

func (u User) Save() {
	users = append(users, u)

}

func GetAllUsers() []User {
	return users
}

func login(c *gin.Context) {
	var user models.User

	err := c.ShouldBindJSON(&user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "could not parse request data."})
		return
	}

	err = user.ValidateCredentials()

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "invalid credentials"})
		return
	}

	token, err := utils.GenerateToken(user.Email, user.ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})

}

func (u User) ValidateCredentials() error {
	// Need to validate credentials
	// Need to get the password from DB and compare with the provided one
	// 1) Query from MongoDB
	var user User
	err := db.Collection("users").FindOne(context.Background(), bson.M{"email": u.Email}).Decode(&user)
	if err != nil {
		return err
	}

	passwordIsValid := utils.CheckPasswordHash(u.Password, user.Password)

	if !passwordIsValid {
		return errors.New("invalid password")
	}

	// If everything is fine, return nil

	return nil
}
